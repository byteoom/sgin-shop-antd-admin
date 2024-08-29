import React, { useState, useEffect, useRef } from 'react';
import { Button, message, Popconfirm, Modal, Form, Select } from 'antd';
import ProTable from '@ant-design/pro-table';
import { teamService } from '@/services';
import { userService } from '@/services'; // 假设有获取用户列表的服务
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useParams } from 'react-router-dom';

const { Option } = Select;

const TeamMemberManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const actionRef = useRef();
  const {teamId} = useParams();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userService.getUserOptions();
      if (response.code === 200) {
        setUsers(response.data);
      } else {
        message.error('获取用户列表失败');
      }
    } catch (error) {
      message.error('获取用户列表失败');
    }
  };

  const handleAddMember = () => {
    setSelectedUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleDeleteMember = async (id) => {
    try {
      const res = await teamService.deleteTeamMember({ uuid: id });
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
      values.team_uuid = teamId;
      const res = await teamService.addTeamMember(values);
      if (res.code === 200) {
        message.success('添加成功');
      } else {
        message.error('添加失败 :' + res.message);
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

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', hideInSearch: true },
    { title: 'UUID', dataIndex: 'uuid', key: 'uuid', width: 300 },
    { title: '成员姓名', dataIndex: 'name', key: 'name' },
    { title: '角色', dataIndex: 'role', key: 'role' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '电话', dataIndex: 'phone', key: 'phone' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      render: (_, record) => (
        <span>
          <Popconfirm
            title="确定删除这个成员吗?"
            onConfirm={() => handleDeleteMember(record.uuid)}
            okText="是"
            cancelText="否"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </span>
      ),
    },
  ];

  const queryMembers = async (params, sort, filter) => {
    try {
      const response = await teamService.getTeamMembers({ ...params, ...sort, ...filter, team_uuid: teamId });
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

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        rowKey="uuid"
        actionRef={actionRef}
        request={queryMembers}
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
            onClick={handleAddMember}
            type="primary"
          >
            添加成员
          </Button>,
        ]}
      />
      <Modal
        title="添加成员"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="user_uuid"
            label="选择成员"
            rules={[{ required: true, message: '请选择一个用户' }]}
          >
            <Select
              showSearch
              placeholder="选择一个用户"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {users.map((user) => (
                <Option key={user.uuid} value={user.uuid}>
                  {user.username} ({user.email})
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default TeamMemberManagement;
