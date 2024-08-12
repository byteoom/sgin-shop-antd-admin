import { Form, Input, Switch, Typography } from 'antd';

const ProductManagement = () => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography.Title level={5}>产品管理</Typography.Title>
      <Form layout="vertical">
        <Form.Item label="产品上架状态" required>
          <Switch checkedChildren="上架" unCheckedChildren="未上架" />
        </Form.Item>
        
        {/* 产品低于警戒库存是否可以售卖*/}
        <Form.Item label="低于警戒库存是否售卖" required>
          <Switch checkedChildren="是" unCheckedChildren="否" />
        </Form.Item>

        <Form.Item label="产品警戒库存" required>
          <Input placeholder="输入产品警戒库存" />
        </Form.Item>
        
        <Form.Item label="库存管理单位" required>
          <Input placeholder="输入库存单位" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductManagement;
