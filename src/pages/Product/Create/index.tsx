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
  Switch,
  Typography,
  Upload,
} from 'antd';
import { useState } from 'react';
import ProductVariant from './ProductVariant'; // Import your ProductVariant component
import VariantInformation from './VariantInformation'; // Import the VariantInformation component
import ProductManagement from './ProductManagement'; // Import the ProductManagement component

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

  // 变体详情信息
  const [variantInfo, setVariantInfo] = useState([]);

  const handleUpload = () => {
    // Handle file upload logic here
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
        <Form layout="vertical">
          <Form.Item
            label="产品名称"
            required
            tooltip="输入您产品的唯一名称。使其描述性强且易于客户记忆。"
          >
            <Input placeholder="产品名称" maxLength={70} />
          </Form.Item>

          <Form.Item
            label="分类"
            tooltip="选择最能代表您产品的主要类别。这有助于客户更容易找到您的产品。"
          >
            <Select placeholder="选择分类">
              <Option value="jewelry">珠宝</Option>
              {/* 需要时添加更多选项 */}
            </Select>
          </Form.Item>
        </Form>
      </div>
      {/* 上传产品部分 */}
      <div style={{ marginBottom: '20px' }}>
        <Typography.Title level={5}>上传产品</Typography.Title>
        <Form layout="vertical">
          <Form.Item
            label="产品照片"
            required
            tooltip="高质量的图片可以显著提升产品的吸引力。上传清晰、光线良好的照片，展示您的产品从不同角度的外观。"
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
        <Form layout="vertical">
          <Form.Item
            label="产品状态"
            tooltip="准确选择您产品的状态，以设定清晰的客户期望。"
          >
            <Radio.Group>
              <Radio value="new">全新</Radio>
              <Radio value="second">二手</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="产品描述"
            required
            tooltip="编写全面的描述，突出产品的独特特征、优点和规格。"
          >
            <TextArea rows={4} placeholder="输入产品描述" maxLength={2000} />
          </Form.Item>

          <Form.Item
            label="产品视频"
            required
            tooltip="添加展示您产品操作的视频。"
          >
            <Button icon={<PlusOutlined />}>添加视频URL</Button>
          </Form.Item>
        </Form>
      </div>
      {/* 产品变体部分 */}
      <ProductVariant variants={variants} setVariants={setVariants} />
      {/* 变体信息部分 */}
      <VariantInformation
        variants={variants}
        variantInfo={variantInfo}
        setVariantInfo={setVariantInfo}
      />
      {/* 产品管理部分 */}
      <ProductManagement /> {/* Add the ProductManagement component here */}
      {/* 运输部分 */}
      <div style={{ marginBottom: '20px' }}>
        <Typography.Title level={5}>运输</Typography.Title>
        <Form layout="vertical">
          <Form.Item label="产品重量" required>
            <Input placeholder="克 (g)" />
          </Form.Item>

          <Alert
            message="密切注意产品的重量，以免与运输快递员的数据信息存在差异。"
            type="warning"
            showIcon
            style={{ marginBottom: '20px' }}
          />

          <Form.Item label="产品尺寸" required>
            <Input.Group compact>
              <Input style={{ width: '33%' }} placeholder="宽度 (厘米)" />
              <Input style={{ width: '33%' }} placeholder="高度 (厘米)" />
              <Input style={{ width: '33%' }} placeholder="长度 (厘米)" />
            </Input.Group>
          </Form.Item>

        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
