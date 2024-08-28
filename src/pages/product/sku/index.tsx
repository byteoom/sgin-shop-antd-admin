import { deleteProductItem, getProductItems } from '@/services/product/product';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import ProTable from '@ant-design/pro-table';
import { history } from '@umijs/max';
import { Button, Input, message, Modal, Popconfirm, Typography } from 'antd';
import { useRef, useState } from 'react';

const { TextArea } = Input;

const SkuManagement = () => {
  const actionRef = useRef();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleAddSku = () => {
    history.push('/sku/create');
  };

  const querySku = async (params, sort, filter) => {
    const queryParams = {
      ...params,
      ...sort,
      ...filter,
    };

    try {
      const response = await getProductItems(queryParams);
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

  const handleDeleteSku = async (id) => {
    try {
      const res = await deleteProductItem({ uuids: [id] });
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

  const handlePreviewImage = (url) => {
    setPreviewVisible(true);
    setPreviewImage(url);
  };

  const handleEditSku = (record) => {
    history.push(`/product/sku/edit/${record.uuid}`);
  };

  const columns = [
    {
      title: '产品图片',
      dataIndex: 'images',
      key: 'images',
      hideInSearch: true,
      render: (_, record) => {
        if (record.image_list.length > 0) {
          return (
            <img
              src={'/public/' + record.image_list[0]}
              alt="sku"
              style={{ width: 50 }}
              onClick={() =>
                handlePreviewImage('/public/' + record.image_list[0])
              }
            />
          );
        }

        if (record.product_info?.image_list.length > 0) {
          return (
            <img
              src={'/public/' + record.product_info.image_list[0]}
              alt="product"
              style={{ width: 50 }}
              onClick={() =>
                handlePreviewImage(
                  '/public/' + record.product_info.image_list[0],
                )
              }
            />
          );
        }

        return <Typography.Text type="secondary">暂无图片</Typography.Text>;
      },
    },
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        if (record.name == null || record.name == '') {
          return <p> {record.product_info?.name} </p>;
        }
        return <p>{record.name} </p>;
      },
    },
    {
      title: 'SKU',
      dataIndex: 'variants',
      key: 'variants',
      hideInSearch: true,
    },
    {
      title: '产品描述',
      dataIndex: 'description',
      key: 'description',
      hideInSearch: true,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `¥${price}`,
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      hideInSearch: true,
    },
    {
      title: '折扣价',
      dataIndex: 'discount_price',
      key: 'discount_price',
      render: (discountPrice) => (discountPrice ? `¥${discountPrice}` : '无'),
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
            onClick={() => handleEditSku(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => handleDeleteSku(record.uuid)}
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
        request={querySku}
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
            onClick={handleAddSku}
            type="primary"
          >
            添加SKU
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

export default SkuManagement;
