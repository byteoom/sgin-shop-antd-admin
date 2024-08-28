import { Alert, Form, Input, Typography } from 'antd';

const ShippingForm = ({ form }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography.Title level={5}>运输</Typography.Title>
      <Form layout="vertical" form={form}>
        <Form.Item
          name="weight"
          label="产品重量"
          rules={[{ required: false, message: '请输入产品重量' }]}
        >
          <Input placeholder="克 (g)" />
        </Form.Item>

        <Alert
          message="密切注意产品的重量，以免与运输快递员的数据信息存在差异。"
          type="warning"
          showIcon
          style={{ marginBottom: '20px' }}
        />

        <Form.Item label="产品尺寸">
          <Input.Group compact>
            <Form.Item
              name="length"
              rules={[{ required: false, message: '请输入产品长度' }]}
            >
              <Input placeholder="长度 (厘米)" />
            </Form.Item>
            <Form.Item
              name="width"
              rules={[{ required: false, message: '请输入产品宽度' }]}
            >
              <Input placeholder="宽度 (厘米)" />
            </Form.Item>
            <Form.Item
              name="height"
              rules={[{ required: false, message: '请输入产品高度' }]}
            >
              <Input placeholder="高度 (厘米)" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShippingForm;
