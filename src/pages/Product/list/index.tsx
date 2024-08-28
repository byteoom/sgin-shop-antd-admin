import { deleteProduct, getProducts } from '@/services/product/product';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import ProTable from '@ant-design/pro-table';
// import { history } from '';
import {
  Button,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Tag,
  Typography,
} from 'antd';
import { useRef, useState } from 'react';
import { useNavigate } from '@umijs/max';

const { Option } = Select;
const { TextArea } = Input;

const ProductManagement = () => {

let navigate = useNavigate();
  const actionRef = useRef();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleAddProduct = () => {
    navigate('../create')
    // history.push('/product/create');
  };

  const queryProduct = async (params, sort, filter) => {
    const queryParams = {
      ...params,
      ...sort,
      ...filter,
    };

    try {
      const response = await getProducts(queryParams);
      if (response.code !== 200) {
        return {
          data: [],
          success: false,
          total: 0,
        };
      }
      return {
        data: response.data.data,
        success: true,
        total: response.data.total,
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await deleteProduct({ uuids: [id] });
      if (res.code !== 200) {
        message.error('删除失败 :' + res.message);
      } else {
        message.success('删除成功');
        actionRef.current?.reload();
      }
    } catch (error) {
      message.error('删除失败');
    }
  };

  const renderStatus = (status) => {
    switch (status) {
      case '上架':
        return <Tag color="green">上架</Tag>;
      case '下架':
        return <Tag color="grey">下架</Tag>;
      case '售罄':
        return <Tag color="red">售罄</Tag>;
      default:
        return <Tag color="blue">未知</Tag>;
    }
  };


  const handlePreviewImage = (url) => {
    setPreviewVisible(true);
    setPreviewImage(url);
  };

  const columns = [
    {
      title: '产品图片',
      dataIndex: 'images',
      key: 'images',
      hideInSearch: true,
      render: (_, record) => {
        // 图片数量大于0时显示第一张图片
        if (record.image_list.length > 0) {
          return (
            <img
              src={'/public/' + record.image_list[0]}
              alt="product"
              style={{ width: 50 }}
              onClick={() => handlePreviewImage('/public/' + record.image_list[0])}
            />
          );
        }
        return <Typography.Text type="secondary">暂无图片</Typography.Text>;
      },
    },
    { title: '产品名称', dataIndex: 'name', key: 'name' },
    {
      title: '产品描述',
      dataIndex: 'description',
      key: 'description',
      hideInSearch: true,
    },
    {
      title: '产品类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag>{type}</Tag>,
    },
    {
      title: '产品状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatus(status),
    },
    {
      title: '警戒库存',
      dataIndex: 'stock_warning',
      key: 'stock_warning',
      hideInSearch: true,
    },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      render: (_, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => handleDeleteProduct(record.uuid)}
            okText="是"
            cancelText="否"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        rowKey="id"
        actionRef={actionRef}
        request={queryProduct}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
        search={{
          labelWidth: 'auto',
        }}
        options={false}
        scroll={{ x: 'max-content' }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={handleAddProduct}
            type="primary"
          >
            添加产品
          </Button>,
        ]}
      />
      <Modal
      title="预览图片"
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </PageContainer>
  );
};

export default ProductManagement;
