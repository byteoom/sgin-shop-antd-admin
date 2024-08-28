import { Card, Form, InputNumber } from 'antd';

const SingleProductForm = ({ form }) => {
  return (
    <Card title="单个产品信息">
      <Form form={form} layout="vertical">
        <Form.Item name="price" label="价格">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="stock" label="库存">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SingleProductForm;
