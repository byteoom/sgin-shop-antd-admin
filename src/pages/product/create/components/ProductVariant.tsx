import React, { useState } from 'react';
import { Form, Input, Button, Space, Typography, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ProductVariant = ({variants, setVariants}) => {
//   const [variants, setVariants] = useState([
//     { name: '', options: ['', '', ''] },
//   ]);

  const addOption = (variantIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options.push('');
    setVariants(newVariants);
  };

  const removeOption = (variantIndex, optionIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options.splice(optionIndex, 1);
    setVariants(newVariants);
  };

  const handleOptionChange = (variantIndex, optionIndex, value) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options[optionIndex] = value;
    setVariants(newVariants);
  };

  const handleVariantNameChange = (variantIndex, value) => {
    const newVariants = [...variants];
    newVariants[variantIndex].name = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { name: '', options: [''] }]);
  };

  const removeVariant = (variantIndex) => {
    const newVariants = [...variants];
    newVariants.splice(variantIndex, 1);
    setVariants(newVariants);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography.Title level={5}>产品变体（详细信息）</Typography.Title>
      <Form layout="vertical">
        {variants.map((variant, variantIndex) => (
          <div key={variantIndex} style={{ marginBottom: '20px' }}>
            <Typography.Text strong>变体 {variantIndex + 1}</Typography.Text>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="名字" required>
                  <Input
                    placeholder="输入变体名称"
                    value={variant.name}
                    onChange={(e) => handleVariantNameChange(variantIndex, e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="选项">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {variant.options.map((option, optionIndex) => (
                      <Row key={optionIndex} gutter={16}>
                        <Col span={20}>
                          <Input
                            placeholder={`选项 ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(variantIndex, optionIndex, e.target.value)
                            }
                          />
                        </Col>
                        <Col span={4}>
                          <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => removeOption(variantIndex, optionIndex)}
                            disabled={variant.options.length === 1}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={() => addOption(variantIndex)}
                    >
                      添加新选项
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
            <Button
              type="dashed"
              icon={<DeleteOutlined />}
              onClick={() => removeVariant(variantIndex)}
              style={{ width: '100%' }}
              danger
            >
              删除此变体
            </Button>
          </div>
        ))}
        <Button type="dashed" icon={<PlusOutlined />} onClick={addVariant}>
          添加新变体
        </Button>
      </Form>
    </div>
  );
};

export default ProductVariant;
