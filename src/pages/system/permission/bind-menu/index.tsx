import React, { useState, useEffect } from 'react';
import { Button, Tree, message, Card, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import { history } from '@umijs/max';
import { getMenus } from '@/services/sys/menu';
import { getPermissionInfo } from '@/services/sys/permission';
import { addPermissionMenu, getPermissionMenuInfoByPermissionUuid } from '@/services/sys/permission_menu';
import { PageContainer } from "@ant-design/pro-components";

const BindMenusPage = () => {
  const [menuTree, setMenuTree] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [permissionInfo, setPermissionInfo] = useState({});
  const { permissionId } = useParams(); // 从路由获取权限ID

  useEffect(() => {
    fetchPermissionInfo(permissionId);
    fetchPermissionMenus(permissionId);
    fetchMenus();
  }, [permissionId]);

  const fetchPermissionInfo = async (permissionId) => {
    try {
      const response = await getPermissionInfo({ uuid: permissionId });
      if (response.code === 200) {
        setPermissionInfo(response.data);
      } else {
        message.error('获取权限信息失败');
      }
    } catch (error) {
      message.error('获取权限信息失败');
    }
  };

  const fetchMenus = async () => {
    try {
      const response = await getMenus({});
      setMenuTree(formatMenuTree(response.data.data));
    } catch (error) {
      message.error('获取菜单列表失败');
    }
  };

  const fetchPermissionMenus = async (uuid) => {
    try {
      const response = await getPermissionMenuInfoByPermissionUuid({ uuid });
      const menuUuids = response.data.map((menu) => menu.menu_uuid);
      setSelectedKeys(menuUuids);
    } catch (error) {
      message.error('获取权限已绑定菜单失败');
    }
  };

  const formatMenuTree = (menus) => {
    const map = {};
    menus.forEach((menu) => {
      map[menu.uuid] = { ...menu, key: menu.uuid, title: menu.name, children: [] };
    });
    menus.forEach((menu) => {
      if (menu.parent_uuid && map[menu.parent_uuid]) {
        map[menu.parent_uuid].children.push(map[menu.uuid]);
      }
    });
    return Object.values(map).filter(menu => !menu.parent_uuid);
  };

  const handleBindMenus = async () => {
    try {
      await addPermissionMenu({ permission_uuid: permissionId, menu_uuids: selectedKeys });
      message.success('菜单绑定成功');
      history.push('/system/permission'); // 绑定完成后返回权限列表
    } catch (error) {
      message.error('菜单绑定失败');
    }
  };

  return (
    <PageContainer>
      <Card title="权限信息" bordered={false} style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col span={12}><strong>权限名称: </strong>{permissionInfo.name}</Col>
        </Row>
      </Card>
      <Card title="绑定菜单" bordered={false}>
        <Tree
          checkable
          checkedKeys={selectedKeys}
          onCheck={(checkedKeys) => setSelectedKeys(checkedKeys)}
          treeData={menuTree}
        />
        <Button type="primary" onClick={handleBindMenus} style={{ marginTop: 16 }}>
          绑定菜单
        </Button>
      </Card>
    </PageContainer>
  );
};

export default BindMenusPage;
