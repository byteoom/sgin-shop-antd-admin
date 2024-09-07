import QuillEditor from '@/components/QuillEditor';
import { productServices } from '@/services';
import getBase64, { FileType } from '@/utils/getBase64';
import handleUpload from '@/utils/handleUpload';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import type { UploadFile } from 'antd';
import {
  Alert,
  Anchor,
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
import { UploadChangeParam } from 'antd/es/upload';
import { useState } from 'react';
import {
  CurrencySelect,
  ProductManagement,
  ProductTypeSelector,
  ProductVariant,
  ShippingForm,
  SingleProductForm,
  VariantInformation,
} from './components'; // Import the component

const { Option } = Select;

export const anchorList = [
  { title: '产品信息', href: '#product-info', key: 'product-info' },
  { title: '上传产品图片', href: '#product-upload', key: 'product-upload' },
  { title: '产品详细信息', href: '#product-detail', key: 'product-detail' },
  { title: '产品变体', href: '#product-change', key: 'product-change' },
  { title: '产品管理', href: '#product-management', key: 'product-management' },
  { title: '产品运输', href: '#product-transport', key: 'product-transport' },
];

const ProductForm = () => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [variants, setVariants] = useState([]);
  const [variantInfo, setVariantInfo] = useState([]);
  const [form] = Form.useForm();
  const [productType, setProductType] = useState('single');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const uploadedFileIds = await handleUpload(fileList);

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
      } else {
        values.variants = variants;
        values.variants_vals = variantInfo;
      }

      // 整合产品数据
      const productData = {
        ...values,
        images: uploadedFileIds, // 上传的图片资源 ID
      };

      const result = await productServices.addProduct(productData);

      if (result.code === 200) {
        message.success('产品创建成功！');
        history.push('/product/list');
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('提交表单失败，请检查输入并重试。');
    }
  };

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <PageContainer>
      <div className="rounded-lg p-4 pt-8 bg-white flex justify-center gap-[100px]">
        <div>
          {/* 产品信息部分 */}
          <div id="product-info" className="mb-[20px]">
            <Typography.Title level={5}>产品信息</Typography.Title>
            <Alert
              message="避免销售假冒产品/侵犯知识产权，以防止您的产品被删除。"
              type="warning"
              showIcon
              className="mb-[20px]"
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
                <CurrencySelect
                  value={selectedCurrency}
                  onChange={setSelectedCurrency}
                />
              </Form.Item>
            </Form>
          </div>
          {/* 上传产品部分 */}
          <div id="product-upload" className="mb-[20px]">
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
                  <div className="flex flex-col items-center">
                    <PlusOutlined />
                    Upload
                  </div>
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                  />
                )}
              </Form.Item>
            </Form>
          </div>
          {/* 产品详细信息部分 */}
          <div id="product-detail" className="mb-[20px]">
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
                <QuillEditor />
                {/* <TextArer
                  rows={4}
                  placeholder="输入产品描述"
                  maxLength={2000}
                /> */}
                {/* <PlateEditor /> */}
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
          <div id="product-change" className="mb-[20px]">
            <ProductTypeSelector setProductType={setProductType} />
          </div>
          {/* 根据选择的产品类型渲染组件 */}
          <div id="product-single" className="mb-[20px]">
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
          </div>
          <div id="product-management" className="mb-[20px]">
            <ProductManagement form={form} /> {/* 运输部分 */}
          </div>
          <div id="product-transport" style={{ marginBottom: '20px' }}>
            <ShippingForm form={form} />
          </div>
          <Button type="primary" onClick={handleSubmit}>
            创建产品
          </Button>
        </div>
        <div>
          <Anchor affix offsetTop={100} items={anchorList} />
        </div>
      </div>
    </PageContainer>
  );
};

export default ProductForm;
