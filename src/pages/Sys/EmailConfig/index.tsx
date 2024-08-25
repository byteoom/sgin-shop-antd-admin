import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { getEmailConfig, updateEmailConfig } from '@/services/sys/email_config';

const EmailConfigPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await getEmailConfig();
        if (response.code == 200) {
          form.setFieldsValue(response.data);
        } else {
          message.error('加载邮件配置失败');
        }
      } catch (error) {
        message.error('加载邮件配置时出错');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [form]);

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);

      const response = await updateEmailConfig(values);
      if (response) {
        message.success('邮件配置更新成功');
      } else {
        message.error('邮件配置更新失败');
      }
    } catch (error) {
      message.error('更新邮件配置时出错');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="邮件配置">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          email_smtp_host: '',
          email_smtp_port: '',
          email_smtp_user: '',
          email_smtp_pass: '',
        }}
      >
        <Form.Item
          name="email_smtp_host"
          label="SMTP 服务器"
          rules={[{ required: true, message: '请输入SMTP服务器地址' }]}
        >
          <Input placeholder="请输入SMTP服务器地址" />
        </Form.Item>
        <Form.Item
          name="email_smtp_port"
          label="SMTP 端口"
          rules={[{ required: true, message: '请输入SMTP端口' }]}
        >
          <Input placeholder="请输入SMTP端口" />
        </Form.Item>
        <Form.Item
          name="email_smtp_user"
          label="SMTP 发件人"
          rules={[{ required: true, message: '请输入SMTP发件人邮箱' }]}
        >
          <Input placeholder="请输入SMTP发件人邮箱" />
        </Form.Item>
        <Form.Item
          name="email_smtp_pass"
          label="SMTP 密码"
          rules={[{ required: true, message: '请输入SMTP密码' }]}
        >
          <Input.Password placeholder="请输入SMTP密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存配置
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EmailConfigPage;
