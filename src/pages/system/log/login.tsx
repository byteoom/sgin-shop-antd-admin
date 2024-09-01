import { logApi } from '@/services';
import { LoginLog, LoginLogQueryParams } from '@/services/types';
import { PageContainer } from '@ant-design/pro-components';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Tag } from 'antd';
import { useRef } from 'react';

// const { Option } = Select;

const SysLoginLogManagement = () => {
  const actionRef = useRef();

  const renderStatus = (status: number) => (
    <Tag color={status === 1 ? 'green' : 'red'}>
      {status === 1 ? '成功' : '失败'}
    </Tag>
  );

  const columns: ProColumns<LoginLog>[] = [
    { title: 'ID', dataIndex: 'id', key: 'id', hideInSearch: true },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: 'IP地址', dataIndex: 'ip', key: 'ip' },
    {
      title: '登录状态',
      dataIndex: 'status',
      key: 'status',
      hideInSearch: true,
      render: (__, { status }) => renderStatus(status),
    },
    { title: '消息', dataIndex: 'message', key: 'message', hideInSearch: true },
    {
      title: '浏览器',
      dataIndex: 'browser',
      key: 'browser',
      hideInSearch: true,
    },
    { title: '操作系统', dataIndex: 'os', key: 'os', hideInSearch: true },
    {
      title: '登录设备',
      dataIndex: 'device',
      key: 'device',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      hideInSearch: true,
    },
  ];

  const fetchSysLoginLogs = async (params: LoginLogQueryParams) => {
    try {
      const response = await logApi.getSysLoginLogs(params);
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
        request={fetchSysLoginLogs}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
        search={{
          labelWidth: 'auto',
        }}
        scroll={{ x: 'max-content' }}
        options={false}
        toolBarRender={false}
      />
    </PageContainer>
  );
};

export default SysLoginLogManagement;
