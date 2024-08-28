import { Button, Form, Input, Space, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';

const VariantInformation = ({ variants, variantInfo, setVariantInfo }) => {
  const [price, setPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    const datalist = generateTableDataSource(variants, 0, []);
    // 为生成的每一项数据添加唯一的 key 和固定的列（如 price、costPrice 和 stock）
    const finalDataSource = datalist.map((item, index) => ({
      key: index + 1,
      ...item,
      price: '', // 初始销售价格为空
      costPrice: '', // 初始成本价格为空
      stock: '', // 初始库存为空
    }));

    setVariantInfo(finalDataSource);
  }, [variants]);

  const generateTableDataSource = (variants, index, acc) => {
    if (index === variants.length) {
      return acc;
    }

    const currentVariant = variants[index];
    const newAcc = [];

    if (acc.length === 0) {
      newAcc.push(
        ...currentVariant.options.map((option) => ({
          [currentVariant.name]: option,
        })),
      );
    } else {
      acc.forEach((item) => {
        newAcc.push(
          ...currentVariant.options.map((option) => ({
            ...item,
            [currentVariant.name]: option,
          })),
        );
      });
    }

    return generateTableDataSource(variants, index + 1, newAcc);
  };

  /**
   * 动态合并表格方法
   * @param {*} text 表格每列对应的值
   * @param {*} data 后台返回的展示数据数组, 数据需要按字段排序
   * @param {*} key 表格每列表头字段
   */
  const mergeCells = (text, data, key, index) => {
    if (index !== 0 && text === data[index - 1][key]) {
      return 0;
    }
    let rowSpan = 1;
    for (let i = index + 1; i < data.length; i++) {
      if (text !== data[i][key]) {
        break;
      }
      rowSpan++;
    }
    return rowSpan;
  };

  const applyValues = () => {
    const updatedVariantInfo = variantInfo.map((item) => ({
      ...item,
      price: item.price || price, // 如果 price 是空的，则保留表格中的原始值
      costPrice: item.costPrice || costPrice, // 如果 costPrice 是空的，则保留表格中的原始值
      stock: item.stock || stock, // 如果 stock 是空的，则保留表格中的原始值
    }));
    setVariantInfo(updatedVariantInfo);
  };

  const columns = [
    ...variants.map((variant) => ({
      title: variant.name,
      dataIndex: variant.name,
      key: variant.name,
      render: (text, record, index) => {
        const obj = {
          children: text !== null ? text : '',
          props: {},
        };
        obj.props.rowSpan = mergeCells(
          text,
          variantInfo,
          variant.name,
          index,
        );
        return obj;
      },
    })),
    {
      title: '销售价格',
      dataIndex: 'price',
      key: 'price',
      render: (text, record, index) => (
        <Input
          placeholder="价格"
          prefix="¥"
          value={text}
          onChange={(e) =>
            setVariantInfo((prev) => {
              const newData = [...prev];
              newData[index].price = e.target.value;
              return newData;
            })
          }
        />
      ),
    },
    {
      title: '成本价格',
      dataIndex: 'costPrice',
      key: 'costPrice',
      render: (text, record, index) => (
        <Input
          placeholder="成本价格"
          prefix="¥"
          value={text}
          onChange={(e) =>
            setVariantInfo((prev) => {
              const newData = [...prev];
              newData[index].costPrice = e.target.value;
              return newData;
            })
          }
        />
      ),
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      render: (text, record, index) => (
        <Input
          placeholder="库存"
          value={text}
          onChange={(e) =>
            setVariantInfo((prev) => {
              const newData = [...prev];
              newData[index].stock = e.target.value;
              return newData;
            })
          }
        />
      ),
    },
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography.Title level={5}>变体属性</Typography.Title>
      <Form layout="vertical">
        <Form.Item label="使用此部分可以指定适用于您的产品的变体选项的各种属性。">
          <Space>
            <Input
              placeholder="销售价格"
              prefix="¥"
              style={{ width: 120 }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              placeholder="成本价格"
              prefix="¥"
              style={{ width: 120 }}
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
            />
            <Input
              placeholder="库存"
              style={{ width: 120 }}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <Button type="primary" onClick={applyValues}>
              应用
            </Button>
          </Space>
        </Form.Item>
        <Table dataSource={variantInfo} columns={columns} pagination={false} />
      </Form>
    </div>
  );
};

export default VariantInformation;
