import {
    getPaymentMethodInfo,
    updatePaymentMethodConfig,
  } from '@/services/sys/payment_method';
  import { Button, Card, Form, Input, message, Tabs } from 'antd';
  import { useEffect, useState } from 'react';
  
  const { TabPane } = Tabs;
  
  const PayPalEdit = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [environment, setEnvironment] = useState('production'); // Track the current environment
  
    useEffect(() => {
      // Fetch PayPal configuration on component mount
      const fetchPayPalConfig = async () => {
        try {
          setLoading(true);
          const response = await getPaymentMethodInfo({ code: 'paypal' });
          if (response.code === 200) {
            setPaymentMethod(response.data);
            if (response.data.config != '') {
              const config = JSON.parse(response.data.config);
              form.setFieldsValue(config[environment] || {});
            }
          } else {
            message.error('Failed to load PayPal configuration');
          }
        } catch (error) {
          message.error('An error occurred while fetching PayPal configuration');
        } finally {
          setLoading(false);
        }
      };
  
      fetchPayPalConfig();
    }, [form]);
  
    const handleFormSubmit = async (values) => {
      try {
        setLoading(true);
        const config = paymentMethod.config ? JSON.parse(paymentMethod.config) : {};
        config[environment] = values; // Save the current environment's settings
        const response = await updatePaymentMethodConfig({ uuid: paymentMethod.uuid, config: JSON.stringify(config) });
        if (response.code === 200) {
          message.success('PayPal configuration updated successfully');
        } else {
          message.error('Failed to update PayPal configuration');
        }
      } catch (error) {
        message.error('An error occurred while updating PayPal configuration');
      } finally {
        setLoading(false);
      }
    };
  
    const handleTabChange = (key) => {
      setEnvironment(key);
      if (paymentMethod && paymentMethod.config) {
        console.log("change key:", key);
        const config = JSON.parse(paymentMethod.config);
        console.log("config:", config[key]);
        form.setFieldsValue(config[key] || {});
      }
    };
  
    return (
      <Card title="Edit PayPal Configuration" loading={loading}>
        <Tabs defaultActiveKey="production" onChange={handleTabChange}>
          <TabPane tab="正式环境" key="production">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFormSubmit}
              initialValues={{
                email: '',
                merchant_id: '',
                clientid: '',
                secret: '',
              }}
            >
              <Form.Item
                name="email"
                label="PayPal Email"
                rules={[{ required: true, message: 'Please enter the PayPal email' }]}
              >
                <Input placeholder="Enter PayPal email" />
              </Form.Item>
  
              <Form.Item
                name="merchant_id"
                label="Merchant ID"
                rules={[{ required: true, message: 'Please enter the Merchant ID' }]}
              >
                <Input placeholder="Enter Merchant ID" />
              </Form.Item>
  
              <Form.Item
                name="clientid"
                label="Client ID"
                rules={[{ required: true, message: 'Please enter the Client ID' }]}
              >
                <Input placeholder="Enter Client ID" />
              </Form.Item>
  
              <Form.Item
                name="secret"
                label="Secret"
                rules={[{ required: true, message: 'Please enter the Secret' }]}
              >
                <Input.Password placeholder="Enter Secret" />
              </Form.Item>
  
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save Configuration
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
  
          <TabPane tab="沙箱环境" key="sandbox">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFormSubmit}
              initialValues={{
                email: '',
                merchant_id: '',
                clientid: '',
                secret: '',
              }}
            >
              <Form.Item
                name="email"
                label="PayPal Email"
                rules={[{ required: true, message: 'Please enter the PayPal email' }]}
              >
                <Input placeholder="Enter PayPal email" />
              </Form.Item>
  
              <Form.Item
                name="merchant_id"
                label="Merchant ID"
                rules={[{ required: true, message: 'Please enter the Merchant ID' }]}
              >
                <Input placeholder="Enter Merchant ID" />
              </Form.Item>
  
              <Form.Item
                name="clientid"
                label="Client ID"
                rules={[{ required: true, message: 'Please enter the Client ID' }]}
              >
                <Input placeholder="Enter Client ID" />
              </Form.Item>
  
              <Form.Item
                name="secret"
                label="Secret"
                rules={[{ required: true, message: 'Please enter the Secret' }]}
              >
                <Input.Password placeholder="Enter Secret" />
              </Form.Item>
  
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save Configuration
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    );
  };
  
  export default PayPalEdit;
  