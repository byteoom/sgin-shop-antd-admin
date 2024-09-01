import { permissionApi, userService } from '@/services';
import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Card, Col, Row, Tree, message } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BindPermissionsPage = () => {
  const [permissionTree, setPermissionTree] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const { userId } = useParams(); // 从路由获取用户ID

  const fetchUserInfo = async (userId) => {
    try {
      const response = await userService.getUserInfo(userId);
      if (response.code === 200) {
        setUserInfo(response.data);
      } else {
        message.error('获取用户信息失败');
      }
    } catch (error) {
      message.error('获取用户信息失败');
    }
  };

  const formatTree = (items) => {
    const map = {};
    items.forEach((item) => {
      map[item.uuid] = {
        ...item,
        key: item.uuid,
        title: item.name,
        children: [],
      };
    });
    items.forEach((item) => {
      if (item.parent_uuid && map[item.parent_uuid]) {
        map[item.parent_uuid].children.push(map[item.uuid]);
      }
    });
    return Object.values(map).filter((item) => !item.parent_uuid);
  };

  const fetchPermissions = async () => {
    try {
      const response = await permissionApi.getPermissions();
      setPermissionTree(formatTree(response.data.data));
    } catch (error) {
      message.error('获取权限列表失败');
    }
  };

  const fetchUserPermissions = async (userId) => {
    try {
      const response = await permissionApi.getUserPermissionInfo({
        uuid: userId,
      });
      const permissionUuids = response.data.map(
        (permission) => permission.permission_uuid,
      );
      setSelectedKeys(permissionUuids);
    } catch (error) {
      message.error('获取用户已绑定权限失败');
    }
  };

  useEffect(() => {
    fetchUserInfo(userId);
    fetchUserPermissions(userId);
    fetchPermissions();
  }, [userId]);

  const handleBindPermissions = async () => {
    try {
      await permissionApi.addUserPermission({
        user_uuid: userId,
        permission_uuids: selectedKeys,
      });
      message.success('权限绑定成功');
      history.push('/system/user'); // 绑定完成后返回用户列表
    } catch (error) {
      message.error('权限绑定失败');
    }
  };

  return (
    <PageContainer>
      <Card title="用户信息" bordered={false} style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <strong>用户名: </strong>
            {userInfo.username}
          </Col>
          <Col span={12}>
            <strong>邮箱: </strong>
            {userInfo.email}
          </Col>
        </Row>
      </Card>
      <Card title="绑定权限" bordered={false}>
        <Tree
          checkable
          checkedKeys={selectedKeys}
          onCheck={(checkedKeys) => setSelectedKeys(checkedKeys)}
          treeData={permissionTree}
        />
        <Button
          type="primary"
          onClick={handleBindPermissions}
          style={{ marginTop: 16 }}
        >
          绑定权限
        </Button>
      </Card>
    </PageContainer>
  );
};

export default BindPermissionsPage;
