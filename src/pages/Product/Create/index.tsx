import { addProduct } from '@/services/product/product';
import { createResource } from '@/services/sys/resource';
import { PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import {
  Alert,
  Button,
  Form,
  Image,
  Input,
  Radio,
  Select,
  Typography,
  Upload,
  message,
} from 'antd';
import { useState } from 'react';
import { history } from '@umijs/max';
import ProductManagement from './ProductManagement'; // Import the ProductManagement component
import ProductVariant from './ProductVariant'; // Import your ProductVariant component
import VariantInformation from './VariantInformation'; // Import the VariantInformation component
import ProductTypeSelector from './ProductTypeSelector'; // Import the ProductTypeSelector component
import SingleProductForm from './SingleProductForm'; // Import the SingleProductForm component
import ShippingForm from './ShippingForm'; // Import the ShippingForm component
import CurrencySelect from './CurrencySelect';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { Option } = Select;
const { TextArea } = Input;

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ProductForm = () => {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [variants, setVariants] = useState([]);
  const [variantInfo, setVariantInfo] = useState([]);
  const [form] = Form.useForm();
  const [productType, setProductType] = useState('single');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleUpload = async () => {
    const uploadedFiles = [];
    const formData = new FormData();

    if (fileList.length === 0) {
      message.error('请上传产品图片');
      return [];
    }

    // 将所有文件添加到 FormData 对象中
    for (let file of fileList) {
      formData.append('files', file.originFileObj); // 直接将文件添加到 FormData
    }
    formData.append('path', '/'); // 上传到 product 文件夹

    // 调用 API 上传文件并获取资源 ID 列表
    try {
      const resource = await createResource(formData); // 假设 createResource 接收 FormData 对象

      if (resource && Array.isArray(resource.data)) {
        resource.data.forEach((res) => {
          if (res.uuid) {
            uploadedFiles.push(res.uuid);
          } else {
            message.error(`上传文件失败，资源 ID 缺失`);
          }
        });
      } else {
        message.error(`上传文件失败`);
        return [];
      }
    } catch (error) {
      message.error(`文件上传过程中出现错误`);
      return [];
    }

    return uploadedFiles;
  };


  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const uploadedFileIds = await handleUpload();

      if (uploadedFileIds.length === 0) {
        return;
      }


      values.product_status = values.product_status ? '上架' : '下架';
      values.weight = parseFloat(values.weight);
      values.length = parseFloat(values.length);
      values.width = parseFloat(values.width);
      values.height = parseFloat(values.height);
      values.stock_warning = parseInt(values.stock_warning);
      values.product_type = productType;

      if (productType === 'single') {
        values.price = parseFloat(values.price);
        values.stock = parseInt(values.stock);
        values.variants = [];
        values.variants_vals = [];
      }else {
        values.variants = variants;
        values.variants_vals = variantInfo;
      }

      // 整合产品数据
      const productData = {
        ...values,
        images: uploadedFileIds, // 上传的图片资源 ID
      };

      const result = await addProduct(productData);

      if (result.code == 200) {
        message.success('产品创建成功！');
        history.push('/product/manager');
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('提交表单失败，请检查输入并重试。');
    }
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div
      style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}
    >
      {/* 产品信息部分 */}
      <div style={{ marginBottom: '20px' }}>
        <Typography.Title level={5}>产品信息</Typography.Title>
        <Alert
          message="避免销售假冒产品/侵犯知识产权，以防止您的产品被删除。"
          type="warning"
          showIcon
          style={{ marginBottom: '20px' }}
        />
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="产品名称"
            required
            tooltip="输入您产品的唯一名称。使其描述性强且易于客户记忆。"
            rules={[{ required: true, message: '请输入产品名称' }]}
          >
            <Input placeholder="产品名称" maxLength={70} />
          </Form.Item>
          <Form.Item
            name="alias_name"
            label="产品别名"
            required
            tooltip="输入您产品的别名。是名称的 URL 友好版本。它通常都是小写的，并且只包含字母、数字和连字符。"
            rules={[{ required: true, message: '您产品的别名' }]}
          >
            <Input placeholder="产品的别名" maxLength={70} />
          </Form.Item>

          <Form.Item
            name="category"
            label="分类"
            tooltip="选择最能代表您产品的主要类别。这有助于客户更容易找到您的产品。"
            rules={[{ required: false, message: '请选择分类' }]}
          >
            <Select placeholder="选择分类">
              <Option value="jewelry">珠宝</Option>
              {/* 需要时添加更多选项 */}
            </Select>
          </Form.Item>

          <Form.Item
            name="currency"
            label="销售货币"
            tooltip="选择您产品的销售货币。"
            initialValue={selectedCurrency}
            rules={[{ required: false, message: '请选择您产品的销售货币' }]}
          >
            <CurrencySelect value={selectedCurrency} onChange={setSelectedCurrency} />
          </Form.Item>
        </Form>
      </div>
      {/* 上传产品部分 */}
      <div style={{ marginBottom: '20px' }}>
        <Typography.Title level={5}>上传产品图片</Typography.Title>
        <Form layout="vertical">
          <Form.Item
            label="产品照片"
            required
            tooltip="高质量的图片可以显著提升产品的吸引力。上传清晰、光线良好的照片，展示您的产品从不同角度的外观。"
            rules={[{ required: true, message: '请上传产品照片' }]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}
          </Form.Item>
        </Form>
      </div>
      {/* 产品详细信息部分 */}
      <div style={{ marginBottom: '20px' }}>
        <Typography.Title level={5}>产品详细信息</Typography.Title>
        <Form layout="vertical" form={form}>
          <Form.Item
            name="status"
            label="产品状态"
            tooltip="准确选择您产品的状态，以设定清晰的客户期望。"
          >
            <Radio.Group>
              <Radio value="new">全新</Radio>
              <Radio value="second">二手</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="description"
            label="产品描述"
            tooltip="编写全面的描述，突出产品的独特特征、优点和规格。"
            rules={[{ required: false, message: '请输入产品描述' }]}
          >
            <TextArea rows={4} placeholder="输入产品描述" maxLength={2000} />
          </Form.Item>

          <Form.Item
            name="videoUrl"
            label="产品视频"
            tooltip="添加展示您产品操作的视频。"
            rules={[{ required: false, message: '请添加视频 URL' }]}
          >
            <Button icon={<PlusOutlined />}>添加视频URL</Button>
          </Form.Item>
        </Form>
      </div>
      {/* 产品变体部分 */}

      <ProductTypeSelector setProductType={setProductType} />

        {/* 根据选择的产品类型渲染组件 */}
        {productType === 'single' ? (
        <SingleProductForm form={form} />
      ) : (
        <>
          {/* 产品变体部分 */}
          <ProductVariant variants={variants} setVariants={setVariants} />
          {/* 变体信息部分 */}
          <VariantInformation
            variants={variants}
            variantInfo={variantInfo}
            setVariantInfo={setVariantInfo}
          />
        </>
      )}
      <ProductManagement form={form} />{' '}
      {/* 运输部分 */}
      <div style={{ marginBottom: '20px' }}>
       <ShippingForm form={form} />
      </div>
      <Button type="primary" onClick={handleSubmit}>
        创建产品
      </Button>
    </div>
  );
};

export default ProductForm;
