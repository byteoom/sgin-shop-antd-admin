import { userService } from '@/services';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Progress,
  Row,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';

const { Title, Paragraph, Text } = Typography;

const SecuritySettings = () => {
  const [securityInfo, setSecurityInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisiblePhone, setIsModalVisiblePhone] = useState(false);
  const [isModalVisibleEmail, setIsModalVisibleEmail] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState('');
  const [progressColor, setProgressColor] = useState('#f5222d'); // 初始为红色
  const [form] = Form.useForm();
  const [formPhone] = Form.useForm();
  const [formEmail] = Form.useForm();

  const fetchSecurityInfo = async () => {
    setLoading(true);
    try {
      const response = await userService.getMyUserInfo();
      setSecurityInfo(response.data);
    } catch (error) {
      message.error('获取安全信息失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecurityInfo();
  }, []);

  const handlePasswordChange = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisiblePhone(false);
    setIsModalVisibleEmail(false);
    form.resetFields();
    formPhone.resetFields();
    formEmail.resetFields();
  };

  const handlePhoneChange = () => {
    setIsModalVisiblePhone(true);
    formPhone.resetFields();
  };

  const handleEmailChange = () => {
    setIsModalVisibleEmail(true);
    formEmail.resetFields();
  };

  const handlePasswordUpdate = async (values) => {
    if (values.newPassword !== values.rePassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    setLoading(true);
    try {
      const res = await userService.updateUser({
        uuid: securityInfo.uuid,
        password: values.newPassword,
        password_strength: passwordStrength,
      });
      if (res.code !== 200) {
        message.error('密码更新失败');

        return;
      }
      message.success('密码更新成功');
      setIsModalVisible(false);
      fetchSecurityInfo();
    } catch (error) {
      message.error('密码更新失败');
    } finally {
      setLoading(false);
    }
  };

  const hanldePhoneChange = async (values) => {
    setLoading(true);
    try {
      const res = await userService.updateUser({
        uuid: securityInfo.uuid,
        phone: values.phone,
      } as any);
      if (res.code !== 200) {
        message.error('手机号更新失败');
        return;
      }
      message.success('手机号更新成功');
      setIsModalVisiblePhone(false);
      fetchSecurityInfo();
    } catch (error) {
      message.error('手机号更新失败');
    } finally {
      setLoading(false);
    }
  };

  const hanldeEmailChange = async (values) => {
    setLoading(true);
    try {
      const res = await userService.updateUser({
        uuid: securityInfo.uuid,
        email: values.email,
      } as any);
      if (res.code !== 200) {
        message.error('邮箱更新失败');
        return;
      }
      message.success('邮箱更新成功');
      setIsModalVisibleEmail(false);
      fetchSecurityInfo();
    } catch (error) {
      message.error('邮箱更新失败');
    } finally {
      setLoading(false);
    }
  };

  const checkPasswordStrength = (value) => {
    let strength = 0;
    if (value.length > 5) strength += 20;
    if (value.length > 8) strength += 30;
    if (/[A-Z]/.test(value)) strength += 20;
    if (/[0-9]/.test(value)) strength += 20;
    if (/[^A-Za-z0-9]/.test(value)) strength += 10;

    let label = '弱';
    let color = '#f5222d'; // 红色

    if (strength > 60) {
      label = '中等';
      color = '#faad14'; // 橙色
    }
    if (strength > 80) {
      label = '强';
      color = '#52c41a'; // 绿色
    }

    setPasswordStrength(strength);
    setStrengthLabel(label);
    setProgressColor(color);
    return strength;
  };

  const formatPasswordStrength = (strength) => {
    let label = '弱';
    let color = '#f5222d'; // 红色

    if (strength > 60) {
      label = '中等';
      color = '#faad14'; // 橙色
    }
    if (strength > 80) {
      label = '强';
      color = '#52c41a'; // 绿色
    }

    return { label, color };
  };

  const getPasswordStrength = () => {
    const { label, color } = formatPasswordStrength(
      securityInfo.password_strength,
    );
    return <Text style={{ color }}>{label}</Text>;
  };

  return (
    securityInfo && (
      <Card loading={loading}>
        <Title level={4}>安全设置</Title>
        <Divider />
        <Row gutter={16}>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Paragraph>账户密码</Paragraph>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button type="link" onClick={handlePasswordChange}>
                  修改
                </Button>
              </Col>
            </Row>
            <Paragraph type="secondary">
              当前密码强度：{getPasswordStrength()}
            </Paragraph>
            <Divider />
            <Row>
              <Col span={12}>
                <Paragraph>手机</Paragraph>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button type="link" onClick={handlePhoneChange}>
                  修改
                </Button>
              </Col>
            </Row>
            <Paragraph type="secondary">
              已绑定手机：{securityInfo?.phone}
            </Paragraph>
            <Divider />

            <Row>
              <Col span={12}>
                <Paragraph>邮箱</Paragraph>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button type="link" onClick={handleEmailChange}>
                  修改
                </Button>
              </Col>
            </Row>
            <Paragraph type="secondary">
              已绑定邮箱：{securityInfo?.email}
            </Paragraph>
          </Col>
        </Row>

        <Modal
          title="修改密码"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handlePasswordUpdate}>
            <Form.Item
              name="newPassword"
              label="新密码"
              rules={[{ required: true, message: '请输入新密码' }]}
            >
              <Input.Password
                onChange={(e) => checkPasswordStrength(e.target.value)}
              />
            </Form.Item>
            <div>
              <Text>密码强度: {strengthLabel}</Text>
              <Progress
                percent={passwordStrength}
                showInfo={false}
                strokeColor={progressColor}
              />
            </div>
            <Form.Item
              name="rePassword"
              label="确认密码"
              rules={[{ required: true, message: '请再次输入密码' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                更新密码
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="修改手机号码"
          open={isModalVisiblePhone}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={formPhone} layout="vertical" onFinish={hanldePhoneChange}>
            <Form.Item
              name="phone"
              label="手机号"
              rules={[{ required: true, message: '请输入手机号' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                更新手机号
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="修改邮箱"
          open={isModalVisibleEmail}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={formEmail} layout="vertical" onFinish={hanldeEmailChange}>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[{ required: true, message: '请输入邮箱' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                更新邮箱
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    )
  );
};

export default SecuritySettings;
