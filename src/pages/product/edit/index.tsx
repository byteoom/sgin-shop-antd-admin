import HaoUpload from '@/components/HaoUpload';
import QuillEditor from '@/components/QuillEditor';
import { CURRENCY, ProductCategory, ProductStatus } from '@/constants/product';
import { currencyApi, productServices } from '@/services';
import { Product } from '@/services/types';
import {
  PageContainer,
  ProForm,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Alert, Anchor, Form, Input, message, Typography } from 'antd';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { anchorList } from '../create';

const ProductEdit = () => {
  const { uuid } = useParams();

  const formRef = useRef<ProFormInstance<Product>>();
  const getProduct = async () => {
    const result = await productServices.getProduct({ uuid });
    formRef.current?.setFieldsValue({
      ...result.data,
      ...(result?.data?.images && { images: JSON.parse(result.data.images) }),
    });
  };

  // 获取货币种类
  const getCurrencies = async () => {
    const result = await currencyApi.getCurrencyOptions();
    return result.data.map((item) => ({
      label: `${item.name}(${item.code})`,
      value: item.code,
    }));
  };

  // 处理编辑提交
  const handleSubmit = async (values: Product) => {
    console.log(values);
    try {
      const result = await productServices.updateProduct(values);
      if (result.code === 200) {
        message.success('更新成功');
        history.push('/product/list');
        return true;
      }
      return false;
    } catch (err) {
      message.error('更新失败');
      return false;
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <PageContainer title="商品编辑">
      <div className="rounded-lg p-4 pt-8 bg-white flex justify-center gap-[100px]">
        <div className="min-w-[300px]">
          <ProForm formRef={formRef} layout="vertical" onFinish={handleSubmit}>
            <div id="product-info" className="mb-[20px]">
              <Typography.Title level={5}>产品信息</Typography.Title>
              <ProFormText name="uuid" hidden />
              <ProFormText
                name="name"
                label="产品名称"
                placeholder="产品名称"
                tooltip="输入您产品的唯一名称。使其描述性强且易于客户记忆。"
                rules={[{ required: true, message: '请输入产品名称' }]}
              />
              <ProFormText
                name="alias_name"
                label="产品别名"
                placeholder="产品别名"
                tooltip="输入您产品的别名。是名称的 URL 友好版本。它通常都是小写的，并且只包含字母、数字和连字符。"
                rules={[{ required: true, message: '请输入产品别名' }]}
              />

              <ProFormSelect
                name="category"
                label="分类"
                tooltip="选择最能代表您产品的主要类别。这有助于客户更容易找到您的产品。"
                rules={[{ required: false, message: '请选择分类' }]}
                valueEnum={ProductCategory}
              />

              <ProFormSelect
                name="currency"
                label="销售货币"
                tooltip="选择您产品的销售货币。"
                debounceTime={300}
                rules={[{ required: false, message: '请选择您产品的销售货币' }]}
                initialValue={CURRENCY}
                request={getCurrencies}
              />
            </div>
            <div id="product-upload" className="mb-[20px]">
              <Typography.Title level={5}>上传产品图片</Typography.Title>
              <Form.Item name="images" label="产品照片">
                <HaoUpload />
              </Form.Item>
            </div>
            <div id="product-detail" className="mb-[20px]">
              <Typography.Title level={5}>产品详细信息</Typography.Title>
              <ProFormRadio.Group
                name="status"
                label="产品状态"
                tooltip="准确选择您产品的状态，以设定清晰的客户期望。"
                valueEnum={ProductStatus}
              />
              <Form.Item
                name="description"
                label="产品描述"
                tooltip="编写全面的描述，突出产品的独特特征、优点和规格。"
                rules={[{ required: false, message: '请输入产品描述' }]}
              >
                <QuillEditor />
              </Form.Item>
              <div id="product-management" className="mb-[20px]">
                <ProFormSwitch
                  fieldProps={{
                    checkedChildren: '上架',
                    unCheckedChildren: '未上架',
                    defaultChecked: true,
                  }}
                  name="product_status"
                  label="产品上架状态"
                />
                <ProFormSwitch
                  fieldProps={{
                    checkedChildren: '是',
                    unCheckedChildren: '否',
                    defaultChecked: true,
                  }}
                  name="stock_warning_sell"
                  label="低于警戒库存是否售卖"
                />
                <ProFormText
                  name="stock_warning"
                  label="产品警戒库存"
                  rules={[{ required: false, message: '请输入产品警戒库存' }]}
                />
                <ProFormText
                  name="unit"
                  label="库存管理单位"
                  rules={[{ required: false, message: '请输入库存管理单位' }]}
                />
              </div>
              <div id="product-transport" style={{ marginBottom: '20px' }}>
                <Typography.Title level={5}>运输</Typography.Title>
                <ProFormText
                  name="weight"
                  label="产品重量"
                  placeholder="克 (g)"
                  rules={[{ required: false, message: '请输入产品重量' }]}
                />
                <Alert
                  message="密切注意产品的重量，以免与运输快递员的数据信息存在差异。"
                  type="warning"
                  showIcon
                  className="mb-[20px]"
                />
                <Form.Item label="产品尺寸">
                  <Input.Group compact>
                    <ProFormText
                      name="length"
                      placeholder="长度（厘米）"
                      rules={[{ required: false, message: '请输入产品长度' }]}
                    />
                    <ProFormText
                      name="width"
                      placeholder="宽度（厘米）"
                      rules={[{ required: false, message: '请输入产品宽度' }]}
                    />
                    <ProFormText
                      name="height"
                      placeholder="高度（厘米）"
                      rules={[{ required: false, message: '请输入产品高度' }]}
                    />
                  </Input.Group>
                </Form.Item>
              </div>
            </div>
          </ProForm>
        </div>
        <div>
          <Anchor affix offsetTop={100} items={anchorList} />
        </div>
      </div>
    </PageContainer>
  );
};
export default ProductEdit;
