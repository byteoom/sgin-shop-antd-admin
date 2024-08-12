import { Form, Input, Switch, Typography } from 'antd';

const ProductManagement = ({ form }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography.Title level={5}>产品管理</Typography.Title>
      <Form form={form} layout="vertical">
        <Form.Item
          name="productStatus"
          label="产品上架状态"
          valuePropName="checked"
          required
        >
          <Switch checkedChildren="上架" unCheckedChildren="未上架" />
        </Form.Item>
        
        <Form.Item
          name="allowSaleBelowAlert"
          label="低于警戒库存是否售卖"
          valuePropName="checked"
          required
        >
          <Switch checkedChildren="是" unCheckedChildren="否" />
        </Form.Item>

        <Form.Item
          name="alertStock"
          label="产品警戒库存"
          required
          rules={[{ required: true, message: '请输入产品警戒库存' }]}
        >
          <Input placeholder="输入产品警戒库存" />
        </Form.Item>
        
        <Form.Item
          name="sku"
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
