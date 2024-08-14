import { Form, Input, Switch, Typography } from 'antd';

const ProductManagement = ({ form }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography.Title level={5}>产品管理</Typography.Title>
      <Form form={form} layout="vertical">
        <Form.Item
          name="product_status"
          label="产品上架状态"
          valuePropName="checked"
          initialValue={false}
          required
        >
          <Switch checkedChildren="上架" unCheckedChildren="未上架" />
        </Form.Item>
        
        <Form.Item
          name="stock_warning_sell"
          label="低于警戒库存是否售卖"
          initialValue={false}
          valuePropName="checked"
          required
        >
          <Switch checkedChildren="是" unCheckedChildren="否" />
        </Form.Item>

        <Form.Item
          name="stock_warning"
          label="产品警戒库存"
          required
          rules={[{ required: true, message: '请输入产品警戒库存' }]}
        >
          <Input placeholder="输入产品警戒库存" />
        </Form.Item>
        
        <Form.Item
          name="unit"
          label="库存管理单位"
          required
          rules={[{ required: true, message: '请输入库存管理单位' }]}
        >
          <Input placeholder="输入库存单位" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductManagement;
