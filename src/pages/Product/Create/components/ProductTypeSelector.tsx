import React, { useState } from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;

const ProductTypeSelector = ({ setProductType }) => {
  const handleSelectChange = (value) => {
    setProductType(value);
  };

  return (
    <Form.Item label="选择产品类型">
      <Select onChange={handleSelectChange} defaultValue="single">
        <Option value="single">单个产品</Option>
        <Option value="variant">可变产品</Option>
      </Select>
    </Form.Item>
  );
};

export default ProductTypeSelector;
