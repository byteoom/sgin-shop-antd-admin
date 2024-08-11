import {
  createFolder,
  createResource,
  deleteResource,
  getResourceList,
} from '@/services/sys/resource';
import {
  FileOutlined,
  FolderOutlined,
  HomeOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  message,
  Modal,
  Popconfirm,
  Space,
  Upload,
} from 'antd';
import { useEffect, useState } from 'react';

const { Sider, Content } = Layout;

const FileCard = ({ item, onDoubleClick, onImageClick, handleDeleteFile }) => {
  const isImage = item.mime_type && item.mime_type.startsWith('image/');

  const fileMenu = (
    <Menu>
      <Menu.Item key="1">Download</Menu.Item>
      <Menu.Item key="2" onClick={() => alert('Rename')}>
        Rename
      </Menu.Item>
      <Menu.Item key="3" onClick={() => alert('Move')}>
        Move
      </Menu.Item>
      <Popconfirm
        title="确定删除吗?"
        onConfirm={() => handleDeleteFile(item.uuid)}
        okText="是"
        cancelText="否"
      >
        <Menu.Item key="4">Delete</Menu.Item>
      </Popconfirm>
    </Menu>
  );

  return (
    <Card
      hoverable
      style={{
        width: 150,
        marginBottom: 16,
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }}
      onDoubleClick={() => item.type === 'folder' && onDoubleClick(item)}
      cover={
        <div
          style={{
            textAlign: 'center',
            padding: '10px 0',
            position: 'relative',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Checkbox style={{ position: 'absolute', top: 8, left: 8 }} />
          {item.type === 'folder' ? (
            <FolderOutlined style={{ fontSize: 48, color: '#8c8c8c' }} />
          ) : isImage ? (
            <img
              src={'/public' + item.address}
              alt={item.name}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onClick={() => onImageClick('/public' + item.address)}
            />
          ) : (
            <FileOutlined style={{ fontSize: 48, color: '#8c8c8c' }} />
          )}
          <Dropdown overlay={fileMenu} trigger={['click']}>
            <Button
              style={{ position: 'absolute', top: 8, right: 8 }}
              icon={<MoreOutlined />}
              size="small"
            />
          </Dropdown>
        </div>
      }
    >
      {!isImage && <Card.Meta title={item.name} description={item.size} />}
    </Card>
  );
};

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPath, setCurrentPath] = useState('/');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileType, setFileType] = useState('');

  useEffect(() => {
    fetchFiles();
  }, [currentPath, fileType]);

  const handleDeleteFile = async (uuid) => {
    try {
      const res = await deleteResource({ uuid });
      if (res.code == 200) {
        message.success('File deleted successfully');
        fetchFiles();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error('Failed to delete file');
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await getResourceList({
        path: currentPath,
        mime_type: fileType,
      });
      setFiles(response.data.data);
    } catch (error) {
      message.error('Failed to load files');
    }
  };

  const handleCreateFolder = async () => {
    try {
      const values = await form.validateFields();
      await createFolder({ name: values.name, path: currentPath });

      fetchFiles();
      setIsModalVisible(false);
      form.resetFields();
      message.success('Folder created successfully');
    } catch (error) {
      message.error('Failed to create folder');
    }
  };

  const handleFolderDoubleClick = (folder) => {
    setCurrentPath(`${folder.address}`);
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    console.log('Right click');
    setIsModalVisible(true);
  };

  const handleUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('path', currentPath);

    try {
      await createResource(formData);

      fetchFiles();
      
      onSuccess('OK');
      message.success('File uploaded successfully');
    } catch (error) {
      onError(error);
      message.error('Failed to upload file');
    }
  };

  const handleImageClick = (url) => {
    setPreviewImage(url);
    setPreviewVisible(true);
  };

  const renderBreadcrumbs = () => {
    const paths = currentPath.split('/').filter(Boolean);
    return (
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => setCurrentPath('/')}>
          <HomeOutlined />
        </Breadcrumb.Item>
        {paths.map((folder, index) => {
          const path = `/${paths.slice(0, index + 1).join('/')}`;
          return (
            <Breadcrumb.Item key={path} onClick={() => setCurrentPath(path)}>
              {folder}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }} onContextMenu={handleRightClick}>
      <Sider width={200} theme="light">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item
            key="4"
            icon={<FileOutlined />}
            onClick={() => setFileType('')}
          >
            All
          </Menu.Item>
          <Menu.Item
            key="1"
            icon={<FolderOutlined />}
            onClick={() => {
              console.log('setFileType');
              setFileType('image/');
            }}
          >
            Images
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<FileOutlined />}
            onClick={() => setFileType('video/')}
          >
            Videos
          </Menu.Item>
          <Menu.Item key="3" icon={<FileOutlined />}>
            Documents
          </Menu.Item>

          <Menu.Item key="5" icon={<FileOutlined />}>
            Trash
          </Menu.Item>
          <Menu.Divider />
          <Menu.ItemGroup key="g1" title="Labels">
            <Menu.Item key="6">Custom Work</Menu.Item>
            <Menu.Item key="7">Important Meetings</Menu.Item>
            <Menu.Item key="8">Work</Menu.Item>
            <Menu.Item key="9">Design</Menu.Item>
            <Menu.Item key="10">Next Week</Menu.Item>
          </Menu.ItemGroup>
          <Menu.Item key="11" icon={<PlusOutlined />}>
            Add New Label
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '24px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {renderBreadcrumbs()}
          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Input
              placeholder="Search files"
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Upload customRequest={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload New Files</Button>
            </Upload>
          </Space>
          <Content
            style={{ padding: '24px', background: '#fff', minHeight: 280 }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {files
                .filter((file) =>
                  file.name.toLowerCase().includes(searchText.toLowerCase()),
                )
                .map((file) => (
                  <FileCard
                    key={file.id}
                    item={file}
                    onDoubleClick={handleFolderDoubleClick}
                    onImageClick={handleImageClick}
                    handleDeleteFile={handleDeleteFile}
                  />
                ))}
            </div>
          </Content>
        </Space>
      </Layout>

      <Modal
        title="Image Preview"
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      <Modal
        title="Create New Folder"
        open={isModalVisible}
        onOk={handleCreateFolder}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Folder Name"
            rules={[
              { required: true, message: 'Please enter the folder name' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default FileManager;
