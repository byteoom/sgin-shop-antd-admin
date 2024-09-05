import { paymentApi } from '@/services';
import { Button, Card, Form, Input, message, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { PaymentMethod } from '@/services/types';

const AlipayEdit = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();

  useEffect(() => {
    // Fetch Alipay configuration on component mount
    const fetchAlipayConfig = async () => {
      try {
        setLoading(true);
        const response = await paymentApi.getPaymentMethodInfo({
          code: 'alipay',
        });
        if (response.code === 200) {
          setPaymentMethod(response.data);
          if (response.data.config !== '') {
            const config = JSON.parse(response.data.config);
            form.setFieldsValue(config || {});
          }
        } else {
          message.error('Failed to load Alipay configuration');
        }
      } catch (error) {
        message.error('An error occurred while fetching Alipay configuration');
      } finally {
        setLoading(false);
      }
    };

    fetchAlipayConfig();
  }, [form]);

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('app_id', values.app_id);
       // Extract the file object from the uploaded file list
      if (values.private_key && values.private_key[0]?.originFileObj) {
        formData.append('private_key', values.private_key[0].originFileObj);
      }
      if (values.app_public_key && values.app_public_key[0]?.originFileObj) {
        formData.append('app_public_key', values.app_public_key[0].originFileObj);
      }
      if (values.alipay_public_cert && values.alipay_public_cert[0]?.originFileObj) {
        formData.append('alipay_public_cert', values.alipay_public_cert[0].originFileObj);
      }
      if (values.alipay_root_cert && values.alipay_root_cert[0]?.originFileObj) {
        formData.append('alipay_root_cert', values.alipay_root_cert[0].originFileObj);
      }

      const response = await paymentApi.updateAlipayConfig(formData);
      if (response.code === 200) {
        message.success('Alipay configuration updated successfully');
      } else {
        message.error('Failed to update Alipay configuration');
      }
    } catch (error) {
      message.error('An error occurred while updating Alipay configuration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Edit Alipay Configuration" loading={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          app_id: '',
        }}
        encType="multipart/form-data"
      >
        <Form.Item
          name="app_id"
          label="App ID"
          rules={[{ required: true, message: 'Please enter the App ID' }]}
        >
          <Input placeholder="Enter App ID" />
        </Form.Item>

        <Form.Item
          name="private_key"
          label="Alipay Private Key"
          valuePropName="file"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          rules={[{ required: true, message: 'Please upload the Private Key' }]}
        >
          <Upload maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Upload Private Key</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="app_public_key"
          label="Alipay Public Key"
          valuePropName="file"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          rules={[{ required: true, message: 'Please upload the Public Key' }]}
        >
          <Upload maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Upload Public Key</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="alipay_public_cert"
          label="Alipay Public Certificate"
          valuePropName="file"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          rules={[
            { required: true, message: 'Please upload the Alipay Public Certificate' },
          ]}
        >
          <Upload maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Upload Alipay Public Certificate</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="alipay_root_cert"
          label="Alipay Root Certificate"
          valuePropName="file"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          rules={[
            { required: true, message: 'Please upload the Alipay Root Certificate' },
          ]}
        >
          <Upload maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Upload Root Certificate</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Configuration
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AlipayEdit;
