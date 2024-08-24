import { deleteOrder, getOrders, getOrderItemList } from '@/services/order/order';
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import ProTable from '@ant-design/pro-table';
import { history } from '@umijs/max';
import { Button, message, Modal, Popconfirm, Tag, Typography } from 'antd';
import { useRef, useState } from 'react';

const OrderManagement = () => {
  const actionRef = useRef();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  const handleAddOrder = () => {
    history.push('/order/create');
  };

  const queryOrder = async (params, sort, filter) => {
    const queryParams = {
      ...params,
      ...sort,
      ...filter,
    };

    try {
      const response = await getOrders(queryParams);
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

  const handleDeleteOrder = async (id) => {
    try {
      const res = await deleteOrder({ id });
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
      case 'pending':
        return <Tag color="blue">待支付</Tag>;
      case 'paid':
        return <Tag color="green">已支付</Tag>;
      case 'delivered':
        return <Tag color="orange">已发货</Tag>;
      case 'completed':
        return <Tag color="purple">已完成</Tag>;
      case 'closed':
        return <Tag color="red">已关闭</Tag>;
      default:
        return <Tag color="grey">未知</Tag>;
    }
  };

  const handlePreviewOrderItems = async (orderID) => {
    try {
      const response = await getOrderItemList({ order_id: orderID });
      if (response.code === 200) {
        setOrderItems(response.data);
        setPreviewVisible(true);
      } else {
        message.error('获取订单商品失败');
      }
    } catch (error) {
      message.error('获取订单商品失败');
    }
  };

  const columns = [
    { title: '订单编号', dataIndex: 'order_no', key: 'order_no' },
    { title: '用户ID', dataIndex: 'user_id', key: 'user_id' },
    { title: '订单总金额', dataIndex: 'total_amount', key: 'total_amount', hideInSearch: true },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatus(status),
    },
    { title: '收货人姓名', dataIndex: 'receiver_name', key: 'receiver_name' },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      render: (_, record) => (
        <span>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handlePreviewOrderItems(record.id)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => handleDeleteOrder(record.id)}
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
        request={queryOrder}
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
            onClick={handleAddOrder}
            type="primary"
          >
            创建订单
          </Button>,
        ]}
      />
      <Modal
        title="订单商品详情"
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <ProTable
          columns={[
            { title: '商品ID', dataIndex: 'product_item_id', key: 'product_item_id' },
            { title: '数量', dataIndex: 'quantity', key: 'quantity' },
            { title: '单价', dataIndex: 'price', key: 'price' },
            { title: '总价', dataIndex: 'total_amount', key: 'total_amount' },
          ]}
          dataSource={orderItems}
          pagination={false}
          search={false}
          options={false}
        />
      </Modal>
    </PageContainer>
  );
};

export default OrderManagement;
