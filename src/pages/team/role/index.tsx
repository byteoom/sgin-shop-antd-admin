import React, { useState, useEffect, useRef } from 'react';
import { Button, message, Popconfirm, Modal, Form, Input, Switch } from 'antd';
import ProTable from '@ant-design/pro-table';
import { roleService } from '@/services';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useParams } from 'react-router-dom';

const RoleManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [form] = Form.useForm();
  const actionRef = useRef();
  const {teamId} = useParams();

  const handleAddRole = () => {
    setEditingRole(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditRole = (record) => {
    setEditingRole(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDeleteRole = async (id) => {
    try {
      const res = await roleService.deleteRole({ uuid: id });
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
      if (editingRole) {
        await roleService.updateRole({ ...editingRole, ...values });
        message.success('更新成功');
      } else {
        const res = await roleService.addRole(values);
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

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', hideInSearch: true },
    { title: 'UUID', dataIndex: 'uuid', key: 'uuid', width: 300 },
    { title: '角色名称', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'desc', key: 'desc' },
    {
      title: '是否活跃',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive) => (isActive ? '是' : '否'),
    },
    { title: '创建时间', dataIndex: 'created_at', key: 'created_at', hideInSearch: true },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      render: (_, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditRole(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="确定删除这个角色吗?"
            onConfirm={() => handleDeleteRole(record.uuid)}
            okText="是"
            cancelText="否"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </span>
      ),
    },
  ];

  const queryRoles = async (params, sort, filter) => {
    try {
      const response = await roleService.getRoles({ ...params, ...sort, ...filter, team_uuid: teamId });
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
        request={queryRoles}
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
            onClick={handleAddRole}
            type="primary"
          >
            添加角色
          </Button>,
        ]}
      />
      <Modal
        title={editingRole ? '编辑角色' : '添加角色'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="desc"
            label="描述"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="is_active"
            label="是否活跃"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default RoleManagement;
