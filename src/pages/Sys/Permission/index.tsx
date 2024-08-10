import {
  addPermission,
  deletePermission,
  getPermissions,
  updatePermission,
} from '@/services/sys/permission';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import ProTable from '@ant-design/pro-table';
import { Button, Form, Input, message, Modal, Popconfirm, Select } from 'antd';
import { useEffect, useState } from 'react';
import { history } from '@umijs/max';

const { Option } = Select;

// 权限位的定义
const PERMISSION_BITS = [
  { label: '创建', value: 8 },
  { label: '查询', value: 4 },
  { label: '编辑', value: 2 },
  { label: '删除', value: 1 },
];

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);
  const [parentUUID, setParentUUID] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const response = await getPermissions({});
      setPermissions(formatPermissionTree(response.data.data));
    } catch (error) {
      message.error('获取权限列表失败');
    } finally {
      setLoading(false);
    }
  };

  const formatPermissionTree = (permissions) => {
    const map = {};
    permissions.forEach((permission) => {
      map[permission.uuid] = {
        ...permission,
        key: permission.uuid,
        title: permission.name,
        children: [],
      };
    });
    permissions.forEach((permission) => {
      if (permission.parent_uuid && map[permission.parent_uuid]) {
        map[permission.parent_uuid].children.push(map[permission.uuid]);
      }
    });
    return Object.values(map).filter((permission) => !permission.parent_uuid);
  };

  const handleAddPermission = (parentUUID0 = null) => {
    setParentUUID(parentUUID0);
    setEditingPermission(null);
    form.resetFields();
    form.setFieldsValue({ parent_uuid: getParentName(parentUUID0) });

    setIsModalVisible(true);
  };

  const handleEditPermission = (permission) => {
    setParentUUID(permission.parent_uuid);
    setEditingPermission(permission);
    form.setFieldsValue(permission);
    form.setFieldsValue({ parent_uuid: getParentName(permission.parent_uuid) });
    setIsModalVisible(true);
  };

  const handleDeletePermission = async (uuid) => {
    setLoading(true);
    try {
      await deletePermission({ uuid });
      message.success('删除成功');
      fetchPermissions();
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

      if (editingPermission) {
        await updatePermission({ ...editingPermission, ...values });
        message.success('更新成功');
      } else {
        await addPermission(values);
        message.success('添加成功');
      }
      setIsModalVisible(false);
      fetchPermissions();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getParentName = (parentUUID) => {
    const permission = permissions.find((item) => item.uuid === parentUUID);
    return permission ? permission.name : '';
  };

  const handleBindMenus = async (uuid) => {
    history.push(`/system/permission/menu/${uuid}`); // 跳转到绑定菜单页面
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '权限位',
      dataIndex: 'bit',
      key: 'bit',
      render: (bit) =>
        PERMISSION_BITS.find((item) => item.value === bit)?.label,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditPermission(record)}
          />
          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => handleDeletePermission(record.uuid)}
            okText="是"
            cancelText="否"
          >
            <Button icon={<DeleteOutlined />} style={{ marginLeft: 8 }} />
          </Popconfirm>
          <Button
            icon={<PlusOutlined />}
            style={{ marginLeft: 8 }}
            onClick={() => handleAddPermission(record.uuid)}
          />
          <Button onClick={() => handleBindMenus(record.uuid)}>
            绑定菜单到权限
          </Button>
        </span>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dataSource={permissions}
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
            onClick={() => handleAddPermission(null)}
            type="primary"
          >
            添加权限
          </Button>,
        ]}
      />
      <Modal
        title={editingPermission ? '编辑权限' : '添加权限'}
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
          <Form.Item
            name="bit"
            label="权限位"
            initialValue={8}
            rules={[{ required: true, message: '请选择权限位' }]}
          >
            <Select placeholder="请选择权限位" allowClear>
              {PERMISSION_BITS.map((bit) => (
                <Option key={bit.value} value={bit.value}>
                  {bit.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="parent_uuid" label="父权限">
            <Input disabled value={getParentName(parentUUID)} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default PermissionManagement;
