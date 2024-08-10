import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Modal, Form, Input, Switch, message, Tag, Popconfirm, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { getApis, addApi, updateApi, deleteApi } from '@/services/sys/api'; // 假设服务在该路径
import { history } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';

const { Option } = Select;

const SysApiInfoManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingApiInfo, setEditingApiInfo] = useState(null);
  const [form] = Form.useForm();
  const actionRef = useRef();

  const handleAddApiInfo = () => {
    setEditingApiInfo(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditApiInfo = (record) => {
    setEditingApiInfo(record);
    form.setFieldsValue({
      ...record,
      status: record.status === 1,
    });
    setIsModalVisible(true);
  };

  const handleDeleteApiInfo = async (id) => {
    try {
      await deleteApi({ uuid: id });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.status = values.status ? 1 : 0; // Converting switch boolean to status integer
      if (editingApiInfo) {
        await updateApi({ ...editingApiInfo, ...values });
        message.success('更新成功');
      } else {
        await addApi(values);
        message.success('添加成功');
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

  const renderStatus = (status) => (
    <Tag color={status === 1 ? 'green' : 'red'}>{status === 1 ? '启用' : '禁用'}</Tag>
  );

  const renderPermissionLevel = (level) => {
    const levels = {
      1: '公开',
      2: '登录用户',
      3: '管理员',
      4: '超级管理员',
      5: '自定义',
      6: '不可调用',
      7: '内部调用',
      8: '第三方调用',
      9: '其他',
      10: '未知',
    };
    return levels[level] || '未知';
  };


  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', hideInSearch: true },
    { title: 'UUID', dataIndex: 'uuid', key: 'uuid' },
    { title: '模块', dataIndex: 'module', key: 'module' },
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '路径', dataIndex: 'path', key: 'path' },
    { title: '方法', dataIndex: 'method', key: 'method' },
    {
      title: '权限等级',
      dataIndex: 'permission_level',
      key: 'permission_level',
      render: (level) => renderPermissionLevel(level),
    },
    { title: '创建时间', dataIndex: 'created_at', key: 'created_at', hideInSearch: true },
    { title: '更新时间', dataIndex: 'updated_at', key: 'updated_at', hideInSearch: true },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      hideInSearch: true,
      render: (status) => renderStatus(status),
    },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      render: (_, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditApiInfo(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => handleDeleteApiInfo(record.uuid)}
            okText="是"
            cancelText="否"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </span>
      ),
    },
  ];

  const fetchApis = async (params) => {
    try {
      const response = await getApis(params);
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
        rowKey="id"
        actionRef={actionRef}
        request={fetchApis}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
        search={{
          labelWidth: 'auto',
        }}
        scroll={{ x: 'max-content' }}
        options={false}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={handleAddApiInfo}
            type="primary"
          >
            添加API信息
          </Button>,
        ]}
      />
      <Modal
        title={editingApiInfo ? '编辑API信息' : '添加API信息'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="module"
            label="模块"
            rules={[{ required: true, message: '请输入模块名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="path"
            label="路径"
            rules={[{ required: true, message: '请输入路径' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="method"
            label="方法"
            rules={[{ required: true, message: '请输入方法' }]}
          >
            <Select>
              <Option value="GET">GET</Option>
              <Option value="POST">POST</Option>
              <Option value="PUT">PUT</Option>
              <Option value="DELETE">DELETE</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="permission_level"
            label="权限等级"
            rules={[{ required: true, message: '请选择权限等级' }]}
          >
            <Select>
              <Option value={1}>公开</Option>
              <Option value={2}>登录用户</Option>
              <Option value={3}>管理员</Option>
              <Option value={4}>超级管理员</Option>
              <Option value={5}>自定义</Option>
              <Option value={6}>不可调用</Option>
              <Option value={7}>内部调用</Option>
              <Option value={8}>第三方调用</Option>
              <Option value={9}>其他</Option>
              <Option value={10}>未知</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default SysApiInfoManagement;
