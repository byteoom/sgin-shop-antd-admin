import { paymentApi } from '@/services';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { history } from '@umijs/max';
import { Button, message, Switch } from 'antd';
import { useRef, useState } from 'react';

const PaymentMethodManagement = () => {
  const actionRef = useRef();
  const [, setConfigModalVisible] = useState(false);
  const [, setCurrentPaymentMethod] = useState<PaymentMethod>();

  const queryPaymentMethods = async (params, sort, filter) => {
    const queryParams = {
      ...params,
      ...sort,
      ...filter,
    };

    try {
      const response = await paymentApi.getPaymentMethodList(queryParams);
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

  const handleStatusChange = async (record) => {
    const newStatus = record.status === 1 ? 2 : 1; // 1: 启用, 2: 禁用
    try {
      const res = await paymentApi.updatePaymentMethodStatus({
        uuid: record.uuid,
        status: newStatus,
      });
      if (res.code === 200) {
        message.success('状态更新成功');
        actionRef.current?.reload();
      } else {
        message.error('状态更新失败: ' + res.message);
      }
    } catch (error) {
      message.error('状态更新失败');
    }
  };

  const handleEditConfig = (record: PaymentMethod) => {
    if (record.code === 'paypal') {
      history.push('/system/pay/edit');
      return;
    }
    setCurrentPaymentMethod(record);
    setConfigModalVisible(true);
  };

  const columns: ProColumns<PaymentMethod>[] = [
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      hideInSearch: true,
      render: (__, { icon }) => (
        <img src={icon} alt="icon" style={{ width: 40, height: 40 }} />
      ),
    },
    { title: '支付方式名称', dataIndex: 'name', key: 'name' },
    { title: '支付方式代码', dataIndex: 'code', key: 'code' },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Switch
          checked={record.status === 1}
          onChange={() => handleStatusChange(record)}
          checkedChildren="启用"
          unCheckedChildren="禁用"
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      render: (_, record) => (
        <span>
          <Button
            icon={<SettingOutlined />}
            onClick={() => handleEditConfig(record)}
            style={{ marginRight: 8 }}
          >
            配置
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditConfig(record)}
            style={{ marginRight: 8 }}
          >
            编辑
          </Button>
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
        request={queryPaymentMethods}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
        search={{
          labelWidth: 'auto',
        }}
        options={false}
        scroll={{ x: 'max-content' }}
        toolBarRender={() => []}
      />
    </PageContainer>
  );
};

export default PaymentMethodManagement;
