import { userService } from '@/services';
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
  Progress,
  Select,
  Tag,
  Typography,
} from 'antd';
import { useRef, useState } from 'react';

const { Option } = Select;
const { Text } = Typography;

const UserManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState('');
  const [progressColor, setProgressColor] = useState('#f5222d'); // 初始为红色

  const [form] = Form.useForm();
  const actionRef = useRef();

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditUser = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await userService.deleteUser({ uuid: id });
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

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.age = parseInt(values.age ? values.age : 0);
      values.password_strength = passwordStrength;
      if (editingUser) {
        await userService.updateUser({ ...editingUser, ...values });
        message.success('更新成功');
      } else {
        const res = await userService.addUser(values);
        if (res.code === 200) {
          message.success('添加成功');
        } else {
          message.error('添加失败 :' + res.message);
        }
      }
      setIsModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return <Tag color="green">启用</Tag>;
      case 2:
        return <Tag color="grey">禁用</Tag>;
      default:
        return <Tag color="blue">未知</Tag>;
    }
  };

  const renderSex = (sex) => {
    switch (sex) {
      case '0':
        return <Tag color="red">未知</Tag>;
      case '1':
        return <Tag color="green">男</Tag>;
      case '2':
        return <Tag color="grey">女</Tag>;
      default:
        return null;
    }
  };

  const checkPasswordStrength = (value) => {
    let strength = 0;
    if (value.length > 5) strength += 20;
    if (value.length > 8) strength += 30;
    if (/[A-Z]/.test(value)) strength += 20;
    if (/[0-9]/.test(value)) strength += 20;
    if (/[^A-Za-z0-9]/.test(value)) strength += 10;

    let label = '弱';
    let color = '#f5222d'; // 红色

    if (strength > 60) {
      label = '中等';
      color = '#faad14'; // 橙色
    }
    if (strength > 80) {
      label = '强';
      color = '#52c41a'; // 绿色
    }

    setPasswordStrength(strength);
    setStrengthLabel(label);
    setProgressColor(color);
    return strength;
  };

  const queryUser = async (params, sort, filter) => {
    const queryParams = {
      ...params,
      ...sort,
      ...filter,
    };

    try {
      const response = await userService.getUsers(queryParams);
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

  const handleBindPermissions = (record) => {
    history.push(`/system/user/permission/${record.uuid}`);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', hideInSearch: true },
    { title: 'UUID', dataIndex: 'uuid', key: 'uuid', width: 300 },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '手机号', dataIndex: 'phone', key: 'phone' },
    { title: '昵称', dataIndex: 'nickname', key: 'nickname' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatus(status),
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (sex) => renderSex(sex),
      hideInSearch: true,
    },
    {
      title: '个性签名',
      dataIndex: 'signed',
      key: 'signed',
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
            onClick={() => handleEditUser(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => handleDeleteUser(record.uuid)}
            okText="是"
            cancelText="否"
          >
            <Button icon={<DeleteOutlined />} danger />
            <Button
              onClick={() => handleBindPermissions(record)}
              style={{ marginLeft: 8 }}
            >
              {' '}
              授权{' '}
            </Button>
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
        request={queryUser}
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
            onClick={handleAddUser}
            type="primary"
          >
            添加用户
          </Button>,
        ]}
      />
      <Modal
        title={editingUser ? '编辑用户' : '添加用户'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="email"
            label="邮箱"
            rules={[{ required: true, message: '请输入邮箱' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="手机号">
            <Input />
          </Form.Item>
          <Form.Item name="nickname" label="昵称">
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: !editingUser, message: '请输入密码' }]}
          >
            <Input.Password
              onChange={(e) => checkPasswordStrength(e.target.value)}
            />
          </Form.Item>
          <div>
            <Text>密码强度: {strengthLabel}</Text>
            <Progress
              percent={passwordStrength}
              showInfo={false}
              strokeColor={progressColor}
            />
          </div>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
            initialValue={1}
          >
            <Select>
              <Option value={1}>启用</Option>
              <Option value={2}>禁用</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="sex"
            label="性别"
            rules={[{ required: true, message: '请选择性别' }]}
            initialValue="0"
          >
            <Select>
              <Option value="0">未知</Option>
              <Option value="1">男</Option>
              <Option value="2">女</Option>
            </Select>
          </Form.Item>
          <Form.Item name="signed" label="个性签名">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default UserManagement;
