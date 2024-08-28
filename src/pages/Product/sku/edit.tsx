import { getProductItem, updateProductItem } from '@/services/product/product';
import { DeleteOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Upload,
  Typography,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

const ItemType = 'IMAGE';

const ImageItem = ({ url, index, moveImage, handleRemoveImage }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        marginRight: '8px',
        marginBottom: '8px',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <img src={`/public/${url}`} alt="product" style={{ width: '100px' }} />
      <Button
        icon={<DeleteOutlined />}
        size="small"
        shape="circle"
        danger
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          transform: 'translate(50%, -50%)',
        }}
        onClick={() => handleRemoveImage(url)}
      />
    </div>
  );
};

const SkuEdit = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const { uuid } = useParams();
  const [editorData, setEditorData] = useState('');

  const fetchSkuDetails = async (uuid) => {
    try {
      setLoading(true);
      const response = await getProductItem({ uuid });
      if (response.code === 200) {
        if (response.data.name == '') {
          response.data.name = response.data.product_info.name;
        }

        if (response.data.description == '') {
          response.data.description = response.data.product_info.description;
        }

        form.setFieldsValue(response.data);
        if (response.data.image_list.length > 0) {
          setImages(response.data.image_list);
        } else {
          setImages(response.data.product_info.image_list);
        }
      } else {
        message.error('获取SKU信息失败');
      }
    } catch (error) {
      message.error('获取SKU信息失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uuid) {
      fetchSkuDetails(uuid);
    } else {
      message.error('无效的SKU');
      history.push('/sku');
    }
  }, [uuid]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      values.images = images.join(',');
      const response = await updateProductItem(values);
      if (response.code === 200) {
        message.success('更新成功');
        history.push('/sku');
      } else {
        message.error('更新失败: ' + response.message);
      }
    } catch (error) {
      message.error('更新失败');
    }
  };

  const handleImageUpload = (file) => {
    const newImages = [...images, file.response.url]; // Assume the backend returns the image URL
    setImages(newImages);
  };

  const handleRemoveImage = (url) => {
    setImages(images.filter((image) => image !== url));
  };

  const handlePreviewImage = (url) => {
    setPreviewVisible(true);
    setPreviewImage(url);
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <PageContainer>
      <Typography.Title level={5}>产品信息</Typography.Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ stock: 0, price: 0, discount: 0, discount_price: 0 }}
        >
          <Form.Item
            name="name"
            label="产品名称"
            rules={[{ required: true, message: '请输入产品名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="产品图片">
            <Upload
              action="/upload"
              listType="picture-card"
              onChange={({ file }) => handleImageUpload(file)}
              onRemove={(file) => handleRemoveImage(file.url)}
            >
              {images.length < 8 && '+ 上传图片'}
            </Upload>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {images.map((url, index) => (
                <ImageItem
                  key={url}
                  index={index}
                  url={url}
                  moveImage={moveImage}
                  handleRemoveImage={handleRemoveImage}
                />
              ))}
            </div>
          </Form.Item>
          <Typography.Title level={5}>产品详细信息</Typography.Title>
          <Form.Item
            name="description"
            label="产品描述"
            rules={[{ required: true, message: '请输入产品描述' }]}
          >
            <TextArea />
          </Form.Item>
          <Typography.Title level={5}>产品价格与库存信息</Typography.Title>
          <Form.Item
            name="variants"
            label="SKU"
            rules={[{ required: false, message: '请输入变体信息' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="price"
            label="价格"
            rules={[{ required: true, message: '请输入产品价格' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="discount"
            label="折扣"
            rules={[{ required: true, message: '请输入产品折扣' }]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="discount_price"
            label="折扣价"
            rules={[{ required: true, message: '请输入产品折扣价' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="stock"
            label="库存"
            rules={[{ required: true, message: '请输入库存数量' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="unit"
            label="库存单位"
            rules={[{ required: true, message: '请选择产品单位' }]}
          >
            <Select>
              <Option value="个">个</Option>
              <Option value="件">件</Option>
              <Option value="套">套</Option>
              <Option value="箱">箱</Option>
            </Select>
          </Form.Item>
          <Typography.Title level={5}>运输</Typography.Title>
          <Form.Item
            name="weight"
            label="重量"
           
            rules={[{ required: true, message: '请输入产品重量' }]}
          >
            <InputNumber min={0} style={{ width: '100px' }} />
          </Form.Item>
          <Form.Item
            name="length"
            label="长度"
            rules={[{ required: true, message: '请输入产品长度' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="width"
            label="宽度"
            rules={[{ required: true, message: '请输入产品宽度' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="height"
            label="高度"
            rules={[{ required: true, message: '请输入产品高度' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
         

          <Form.Item>
            <Button type="primary" onClick={handleUpdate} loading={loading}>
              更新
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => history.push('/sku')}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
        <Modal
          title="预览图片"
          open={previewVisible}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </PageContainer>
    </DndProvider>
  );
};

export default SkuEdit;
