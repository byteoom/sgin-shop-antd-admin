import React, { useState, useEffect } from 'react';
import { Button, message, Popconfirm, Card, Row, Col } from 'antd';
import ProTable from '@ant-design/pro-table';
import {
  getMenuAPIListByMenuUUID,
  deleteMenuAPI,
  addMenuAPI,
} from '@/services/sys/menu_api';
import { getMenuInfo } from '@/services/sys/menu'; // 假设有获取菜单信息的服务
import { useParams } from 'react-router-dom';
import { getApis } from '@/services/sys/api';
import { PageContainer } from "@ant-design/pro-components";

const BindApisPage = () => {
  const [boundApis, setBoundApis] = useState([]);
  const [selectedApiKeys, setSelectedApiKeys] = useState([]);
  const [availableApis, setAvailableApis] = useState([]);
  const [menuInfo, setMenuInfo] = useState({});
  const { menuId } = useParams(); // 从路由获取菜单ID

  useEffect(() => {
    fetchMenuInfo(menuId);
    fetchBoundApis(menuId);
  }, [menuId]);

  const fetchMenuInfo = async (menuId) => {
    try {
      const response = await getMenuInfo({ uuid: menuId });
      if (response.code === 200) {
        setMenuInfo(response.data);
      } else {
        message.error('获取菜单信息失败');
      }
    } catch (error) {
      message.error('获取菜单信息失败');
    }
  };

  const fetchBoundApis = async (menuId) => {
    try {
      const response = await getMenuAPIListByMenuUUID({ uuid: menuId });
      const boundData = response.data.map(api => ({
        ...api,
        key: api.uuid,
      }));
      setBoundApis(boundData);
      setSelectedApiKeys(boundData.map(api => api.uuid));
    } catch (error) {
      message.error('获取已绑定API失败');
    }
  };

  const handleSave = async () => {
    try {
      await addMenuAPI({ menu_uuid: menuId, api_uuids: selectedApiKeys });
      message.success('API绑定成功');
      fetchBoundApis(menuId); // 更新已绑定的API列表
    } catch (error) {
      message.error('API绑定失败');
    }
  };

  const handleDeleteApi = (apiUuid) => {
    setBoundApis(boundApis.filter(api => api.uuid !== apiUuid));
    setSelectedApiKeys(selectedApiKeys.filter(key => key !== apiUuid));
  };

  const fetchApis = async (params) => {
    try {
      const response = await getApis(params);
      if (response.code !== 200) {
        return {
          data: [],
          success: false,
          total: 0,
        };
      }

      // 更新availableApis，追加新的，不重复添加已有的
      const newApis = response.data.data;
      const existingApiIds = availableApis.map(api => api.uuid);
      const mergedApis = [
        ...availableApis,
        ...newApis.filter(api => !existingApiIds.includes(api.uuid))
      ];
      setAvailableApis(mergedApis);

      return {
        data: mergedApis,
        success: true,
        total: response.data.total,
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };

  const apiColumns = [
    {
      title: 'API 名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '模块',
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '方法',
      dataIndex: 'method',
      key: 'method',
      search: false,
    },
    {
      title: '权限等级',
      dataIndex: 'permission_level',
      key: 'permission_level',
      search: false,
      render: (level) => getPermissionLevelLabel(level),
    },
  ];

  const boundColumns = [
    ...apiColumns,
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="确定解绑这个API吗？"
          onConfirm={() => handleDeleteApi(record.uuid)}
          okText="是"
          cancelText="否"
        >
          <Button type="link" danger>解绑</Button>
        </Popconfirm>
      ),
    },
  ];

  const getPermissionLevelLabel = (level) => {
    const levels = {
      1: '公开',
      2: '登录用户',
      3: '管理员',
      4: '超级管理员',
      5: '自定义',
      6: '不可调用',
      7: '内部调用',
      8: '第三方调用',
      9: '其他',
      10: '未知',
    };
    return levels[level] || '未知';
  };

  return (
    <PageContainer>
      <Card title="菜单信息" bordered={false} style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col span={12}><strong>菜单名称: </strong>{menuInfo.name}</Col>
          <Col span={12}><strong>描述: </strong>{menuInfo.description}</Col>
        </Row>
      </Card>
      <Card title="已绑定的API" bordered={false} style={{ marginBottom: 24 }}>
        <ProTable
          columns={boundColumns}
          dataSource={boundApis}
          rowKey="uuid"
          search={false}
          pagination={false}
          rowSelection={{
            selectedRowKeys: selectedApiKeys,
            onChange: (selectedRowKeys) => setSelectedApiKeys(selectedRowKeys),
          }}
        />
        <Button type="primary" onClick={handleSave} style={{ marginTop: 16 }}>
          保存
        </Button>
      </Card>
      <Card title="可用的API列表" bordered={false}>
        <ProTable
          columns={apiColumns}
          rowKey="uuid"
          request={fetchApis}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
          }}
          rowSelection={{
            selectedRowKeys: selectedApiKeys,
            onChange: setSelectedApiKeys,
          }}
          toolBarRender={() => [
            <Button key="bind" type="primary" onClick={() => setBoundApis(availableApis.filter(api => selectedApiKeys.includes(api.uuid)))}>
              添加到已绑定
            </Button>,
          ]}
        />
      </Card>
    </PageContainer>
  );
};

export default BindApisPage;
