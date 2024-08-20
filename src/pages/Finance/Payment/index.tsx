import React, { useEffect, useState } from 'react';
import {
    message,
} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-components';
import { getPaymentList } from '@/services/payment';

const ProductCategoryManagement = () => {
    const [paymentList, setPaymentList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [queryData, setQueryData] = useState({
        user_id: null,
        order_id: null,
        page:1,
        page_size:10
    });

    useEffect(() => {
        fetchPaymentList();
    }, []);

    const fetchPaymentList = async () => {
        setLoading(true);
        try {
            const response = await getPaymentList(queryData);
            if (response.code === 200 && response.data) {
                setPaymentList(response.data.data); // 设置表格数据
                setPagination({
                    current: response.data.current || 1, // 设置当前页码，如果没有返回，默认为1
                    pageSize: response.data.pageSize || 10, // 设置每页数据条数，如果没有返回，默认为10
                    total: response.data.total, // 设置总数据量
                });
            } else {
                message.error('获取付款列表失败');
            }
        } catch (error) {
            message.error('获取付款列表失败');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = () => {
        console.log('添加分类');
        // 这里添加添加分类的逻辑
    };

    const handleEditCategory = ({record}: { record: any }) => {
        console.log('编辑分类', record);
        // 这里添加编辑分类的逻辑
    };

    const handleDeleteCategory = ({uuid}: { uuid: any }) => {
        console.log('删除分类', uuid);
        // 这里添加删除分类的逻辑
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'UUID',
            dataIndex: 'uuid',
            key: 'uuid',
        },
        {
            title: '用户ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: '订单ID',
            dataIndex: 'order_id',
            key: 'order_id',
        },
        {
            title: '金额',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            valueEnum: {
                0: { text: '禁用', status: 'Default' },
                1: { text: '启用', status: 'Success' },
            },
        },
        {
            title: '操作',
            key: 'action',
        },
    ];

    return (
        <PageContainer>
            <ProTable
                columns={columns}
                dataSource={paymentList}
                loading={loading}
                rowKey="uuid"
                pagination={pagination}
            />
        </PageContainer>
    );
};

export default ProductCategoryManagement;
