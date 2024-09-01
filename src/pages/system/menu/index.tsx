import { menuApi } from '@/services';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import ProTable from '@ant-design/pro-table';
import { history } from '@umijs/max';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Switch,
} from 'antd';
import { useEffect, useState } from 'react';

const { Option } = Select;

// const Icon = (props: { icon: string }) => {
//   const { icon } = props;
//   const antIcon: { [key: string]: any } = icons;

//   if (!antIcon) {
//     console.warn(`Icon ${icon} is not recognized`);
//     return null;
//   }

//   return React.createElement(antIcon[icon]);
// };

const MenuManagement = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [parentUUID, setParentUUID] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState('');

  const [form] = Form.useForm();

  const formatMenuTree = (menus) => {
    const map = {};
    menus.forEach((menu) => {
      map[menu.uuid] = {
        ...menu,
        key: menu.uuid,
        title: menu.name,
        children: [],
      };
    });
    menus.forEach((menu) => {
      if (menu.parent_uuid && map[menu.parent_uuid]) {
        map[menu.parent_uuid].children.push(map[menu.uuid]);
      }
    });
    return Object.values(map).filter((menu) => !menu.parent_uuid);
  };

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const response = await menuApi.getMenus({});
      setMenus(formatMenuTree(response.data.data));
    } catch (error) {
      message.error('获取菜单列表失败');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMenus();
  }, []);

  const getParentName = (uuid) => {
    if (!uuid) return '';
    const parent = menus.find((menu) => menu.uuid === uuid);
    return parent ? parent.name : '';
  };

  const handleAddMenu = (parentUUID0 = null) => {
    setEditingMenu(null);
    setParentUUID(parentUUID0);
    setSelectedIcon('');
    form.resetFields();
    form.setFieldsValue({ parent_uuid: getParentName(parentUUID0) });
    setIsModalVisible(true);
  };

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setParentUUID(menu.parent_uuid);
    setSelectedIcon(menu.icon);
    form.setFieldsValue(menu);
    form.setFieldsValue({ parent_uuid: getParentName(menu.parent_uuid) });
    setIsModalVisible(true);
  };

  const handleDeleteMenu = async (uuid) => {
    setLoading(true);
    try {
      await menuApi.deleteMenu({ uuid });
      message.success('删除成功');
      fetchMenus();
    } catch (error) {
      message.error('删除失败');
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (parentUUID) {
        values.parent_uuid = parentUUID;
      } else {
        values.parent_uuid = '';
      }
      values.icon = selectedIcon;
      values.order = parseInt(values.order ? values.order : 0);
      if (editingMenu) {
        await menuApi.updateMenu({ ...editingMenu, ...values });
        message.success('更新成功');
      } else {
        await menuApi.addMenu(values);
        message.success('添加成功');
      }
      setIsModalVisible(false);
      fetchMenus();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleIconChange = (e) => {
    setSelectedIcon(e.target.value);
  };

  const handleBindApi = (menuId) => {
    history.push(`/system/menu/bindapi/${menuId}`);
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '链接',
      dataIndex: 'link',
      key: 'link',
    },
    {
      title: '排序',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '显示',
      dataIndex: 'is_show',
      key: 'is_show',
      render: (isShow) => (isShow ? '是' : '否'),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        switch (type) {
          case 1:
            return '目录';
          case 2:
            return '菜单';
          case 3:
            return '按钮';
          default:
            return '';
        }
      },
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditMenu(record)}
          />
          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => handleDeleteMenu(record.uuid)}
            okText="是"
            cancelText="否"
          >
            <Button icon={<DeleteOutlined />} style={{ marginLeft: 8 }} />
          </Popconfirm>
          <Button
            icon={<PlusOutlined />}
            style={{ marginLeft: 8 }}
            onClick={() => handleAddMenu(record.uuid)}
          />
          <Button onClick={() => handleBindApi(record.uuid)}>绑定API</Button>
        </span>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dataSource={menus}
        loading={loading}
        rowKey="key"
        pagination={false}
        search={false}
        scroll={{ x: 'max-content' }}
        expandable={{
          childrenColumnName: 'children',
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => handleAddMenu(null)}
            type="primary"
          >
            添加菜单
          </Button>,
        ]}
      />
      <Modal
        title={editingMenu ? '编辑菜单' : '添加菜单'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="link" label="链接">
            <Input />
          </Form.Item>
          <Form.Item name="order" label="排序">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="is_show" label="显示" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select>
              <Option value={1}>目录</Option>
              <Option value={2}>菜单</Option>
              <Option value={3}>按钮</Option>
            </Select>
          </Form.Item>
          <Form.Item name="icon" label="图标">
            <Input value={selectedIcon} onChange={handleIconChange} />
          </Form.Item>
          <Form.Item name="parent_uuid" label="父菜单名称">
            <Input disabled value={getParentName(parentUUID)} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default MenuManagement;
