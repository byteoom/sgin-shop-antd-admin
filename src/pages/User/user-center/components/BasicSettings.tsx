import { getMyUserInfo, updateUser, updateAvatar } from '@/services/user';
import { UploadOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Form, Input, message, Row, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';

const BasicSettings = () => {
  const [loading, setLoading] = useState(false);
  const [avatarKey, setAvatarKey] = useState(Date.now()); // 用于强制刷新头像
  const [form] = Form.useForm();

  const { initialState, setInitialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const fetchUserInfo = initialState?.fetchUserInfo;

  useEffect(() => {
    if (!currentUser) {
      fetchUserInfo?.().then((res) => {
        if (res) {
          setInitialState((s) => ({ ...s, currentUser: res }));
        }
      });
    }
    form.setFieldsValue(currentUser);
  }, [currentUser, form, fetchUserInfo, setInitialState]);

  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      const res = await updateUser({ uuid: currentUser.uuid, ...values });
      if (res.code !== 200) {
        message.error('更新失败 :' + res.message);
        return;
      }
      message.success('更新成功');
      fetchUserInfo?.().then((res) => {
        if (res) {
          setInitialState((s) => ({ ...s, currentUser: res }));
        }
      });
    } catch (error) {
      message.error('更新失败');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: 'file',
    showUploadList: false,
    customRequest: async (info) => {
      const formData = new FormData();
      const file = info.file;
      formData.append('file', file);

      try {
        const res = await updateAvatar(formData); // 确保 updateAvatar 发送请求到服务器的正确端点
        if (res.code !== 200) {
          message.error('上传失败 :' + res.message);
          return;
        }
        const updatedUser = {
          ...currentUser,
          avatar: res.data.avatar, // 确保 res.data.avatar 是包含完整路径或可访问 URL 的头像 URL
        };
        setInitialState((s) => ({ ...s, currentUser: updatedUser }));
        setAvatarKey(Date.now()); // 强制刷新头像
        message.success('头像上传成功');
      } catch (error) {
        message.error('上传失败');
      }
    },
  };

  const getAvatar = () => {
    if (currentUser?.avatar) {
      const res = currentUser.avatar.startsWith('http') ? currentUser.avatar : `/public${currentUser.avatar}`;
      return res;
    }
    return '';
  };

  return (
    <Card loading={loading}>
      <Row gutter={16}>
        <Col span={16}>
          <Form form={form} layout="vertical" onFinish={handleUpdate}>
            <Form.Item
              name="nickname"
              label="昵称"
              rules={[{ required: true, message: '请输入昵称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="signed" label="个人简介">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="country" label="国家/地区">
              <Input />
            </Form.Item>
            <Form.Item name="province" label="所在省市">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="街道地址">
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                更新基本信息
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={8} style={{ textAlign: 'center' }}>
          <Row justify="center">
            <Col span={24} style={{ textAlign: 'center' }}>
              <Avatar size={120} src={getAvatar()} key={avatarKey} />
            </Col>
            <Col span={24} style={{ textAlign: 'center', marginTop: 16 }}>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>更换头像</Button>
              </Upload>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default BasicSettings;
