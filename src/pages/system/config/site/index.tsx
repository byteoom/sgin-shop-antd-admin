import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message, Upload, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getSiteConfig, updateSiteConfig } from '@/services/sys/site_config';
import { createResource } from '@/services/sys/resource'; // This should be your service to handle image uploads

const { Option } = Select;

const SiteConfigPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [logoFileList, setLogoFileList] = useState([]);
  const [faviconFileList, setFaviconFileList] = useState([]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await getSiteConfig();
        if (response.code === 200) {
          form.setFieldsValue(response.data);
          if (response.data.site_logo) {
            setLogoFileList([{ url: response.data.site_logo, name: 'logo', uid: '-1' }]);
          }
          if (response.data.site_favicon) {
            setFaviconFileList([{ url: response.data.site_favicon, name: 'favicon', uid: '-1' }]);
          }
        } else {
          message.error('加载站点配置失败');
        }
      } catch (error) {
        message.error('加载站点配置时出错');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [form]);

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);

      const response = await updateSiteConfig(values);
      if (response) {
        message.success('站点配置更新成功');
      } else {
        message.error('站点配置更新失败');
      }
    } catch (error) {
      message.error('更新站点配置时出错');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = async ({ fileList, field }) => {
    console.log("handleUploadChange:", fileList.length, field);
    if (fileList.length > 0 ) {

      const formData = new FormData();
      formData.append('files', fileList[0].originFileObj);
      formData.append('path', '/site');

      const response = await createResource(formData);
      if (response.code == 200 && response.data.length > 0) {
        form.setFieldsValue({ [field]: '/public' + response.data[0].address });
        if (field === 'site_logo') {
          setLogoFileList([{ url: '/public' + response.data[0].address, name: 'logo', uid: '-1' }]);
        } else if (field === 'site_favicon') {
          setFaviconFileList([{ url: '/public' + response.data[0].address, name: 'favicon', uid: '-1' }]);
        }
      }
    }
  };

  const handleRemove = (field) => {
    if (field === 'site_logo') {
      setLogoFileList([]);
      form.setFieldsValue({ site_logo: '' });
    } else if (field === 'site_favicon') {
      setFaviconFileList([]);
      form.setFieldsValue({ site_favicon: '' });
    }
  };


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  return (
    <Card title="站点配置">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          site_url: '',
          site_title: '',
          site_sub_title: '',
          site_description: '',
          site_keyword: '',
          site_copy_right: '',
          site_record_no: '',
          site_record_url: '',
          site_logo: '',
          site_favicon: '',
          site_language: 'zh', // Default language
        }}
      >
        <Form.Item name="site_url" label="站点URL" rules={[{ required: true, message: '请输入站点URL' }]}>
          <Input placeholder="请输入站点URL" />
        </Form.Item>
        <Form.Item name="site_title" label="站点标题" rules={[{ required: true, message: '请输入站点标题' }]}>
          <Input placeholder="请输入站点标题" />
        </Form.Item>
        <Form.Item name="site_sub_title" label="站点副标题">
          <Input placeholder="请输入站点副标题" />
        </Form.Item>
        <Form.Item name="site_description" label="站点描述">
          <Input.TextArea placeholder="请输入站点描述" />
        </Form.Item>
        <Form.Item name="site_keyword" label="站点关键字">
          <Input placeholder="请输入站点关键字" />
        </Form.Item>
        <Form.Item name="site_copy_right" label="站点版权信息">
          <Input placeholder="请输入站点版权信息" />
        </Form.Item>
        <Form.Item name="site_record_no" label="站点备案号">
          <Input placeholder="请输入站点备案号" />
        </Form.Item>
        <Form.Item name="site_record_url" label="站点备案链接">
          <Input placeholder="请输入站点备案链接" />
        </Form.Item>
        <Form.Item name="site_logo" label="站点Logo">
          <Upload
            name="logo"
            listType="picture-card"
            fileList={logoFileList}
            onChange={(info) => handleUploadChange({ ...info, field: 'site_logo' })}
            onRemove={() => handleRemove('site_logo')}
            customRequest={({ onSuccess }) => onSuccess('ok')}
            showUploadList={{ showRemoveIcon: true }}
            
          >
            {logoFileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item name="site_favicon" label="站点Favicon">
          <Upload
            name="favicon"
            listType="picture-card"
            fileList={faviconFileList}
            onChange={(info) => handleUploadChange({ ...info, field: 'site_favicon' })}
            onRemove={() => handleRemove('site_favicon')}
            customRequest={({ onSuccess }) => onSuccess('ok')}
            showUploadList={{ showRemoveIcon: true }}
          >
            {faviconFileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item name="site_language" label="站点语言">
          <Select placeholder="请选择站点语言">
            <Option value="zh">中文</Option>
            <Option value="en">英语</Option>
            <Option value="es">西班牙语</Option>
            <Option value="fr">法语</Option>
            <Option value="de">德语</Option>
            <Option value="jp">日语</Option>
          </Select>
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

export default SiteConfigPage;
