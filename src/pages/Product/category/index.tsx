import {
  addProductCategory,
  deleteProductCategory,
  getAllProductCategories,
  updateProductCategory,
} from '@/services/product/product_category';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import ProTable from '@ant-design/pro-table';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Switch,
} from 'antd';
import { useEffect, useState } from 'react';

const { Option } = Select;

const ProductCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [parentUUID, setParentUUID] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllProductCategories();
      setCategories(formatCategoryTree(response.data));
    } catch (error) {
      message.error('获取分类列表失败');
    } finally {
      setLoading(false);
    }
  };

  const formatCategoryTree = (categories) => {
    const map = {};
    categories.forEach((category) => {
      map[category.uuid] = {
        ...category,
        key: category.uuid,
        title: category.name,
        children: [],
      };
    });
    categories.forEach((category) => {
      if (category.parent_uuid && map[category.parent_uuid]) {
        map[category.parent_uuid].children.push(map[category.uuid]);
      }
    });
    return Object.values(map).filter((category) => !category.parent_uuid);
  };

  const handleAddCategory = (parentUUID0 = null) => {
    setEditingCategory(null);
    setParentUUID(parentUUID0);
    form.resetFields();
    if (parentUUID0) {
        form.setFieldsValue({ parent_uuid: getParentName(parentUUID0) });
    }

    setIsModalVisible(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setParentUUID(category.parent_uuid);
    form.setFieldsValue(category);
    form.setFieldsValue({ parent_uuid: getParentName(category.parent_uuid) });
    setIsModalVisible(true);
  };

  const handleDeleteCategory = async (uuid) => {
    setLoading(true);
    try {
      await deleteProductCategory({ uuid });
      message.success('删除成功');
      fetchCategories();
    } catch (error) {
      message.error('删除失败');
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.parentUuid = parentUUID || '';
      if (editingCategory) {
        await updateProductCategory({ ...editingCategory, ...values });
        message.success('更新成功');
      } else {
        await addProductCategory(values);
        message.success('添加成功');
      }
      setIsModalVisible(false);
      fetchCategories();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleCancel = () => {
    setParentUUID(null);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (status === 1 ? '启用' : '禁用'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditCategory(record)}
          />
          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => handleDeleteCategory(record.uuid)}
            okText="是"
            cancelText="否"
          >
            <Button icon={<DeleteOutlined />} style={{ marginLeft: 8 }} />
          </Popconfirm>
          <Button
            icon={<PlusOutlined />}
            style={{ marginLeft: 8 }}
            onClick={() => handleAddCategory(record.uuid)}
          />
        </span>
      ),
    },
  ];

  const getParentName = (uuid) => {
    console.log('uuid:', uuid);

    if (!uuid) return '';
    const parent = categories.find((category) => category.uuid === uuid);
    console.log('paremnt:', parent);
    return parent ? parent.name : '';
  };

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dataSource={categories}
        loading={loading}
        rowKey="key"
        pagination={false}
        search={false}
        expandable={{
          childrenColumnName: 'children',
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => handleAddCategory(null)}
            type="primary"
          >
            添加分类
          </Button>,
        ]}
      />
      <Modal
        title={editingCategory ? '编辑分类' : '添加分类'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input />
          </Form.Item>
          <Form.Item name="icon" label="图标">
            <Input />
          </Form.Item>
          <Form.Item name="sort" label="排序">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="status" label="状态" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="parent_uuid" label="父级分类">
            {parentUUID == null ? (
              <Select
                showSearch
                placeholder="选择父级分类（可选）"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                value={parentUUID || ''}
                onChange={(value) => setParentUUID(value)}
              >
                <Option value="">无</Option>
                {categories.map((category) => (
                  <Option key={category.uuid} value={category.uuid}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            ) : (
              <Input disabled value={getParentName(parentUUID)} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default ProductCategoryManagement;
