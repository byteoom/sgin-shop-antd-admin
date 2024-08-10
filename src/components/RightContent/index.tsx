import {
    LoginOutlined,
    LogoutOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import { useModel, history } from '@umijs/max';
  import { Avatar, Space } from 'antd';
  import Cookies from 'js-cookie';
  import HeaderDropdown from '../HeaderDropdown';

  import { useEffect } from 'react';
  
  export default function RightContent({ isHome = false }) {
    const { initialState, setInitialState, refresh } = useModel('@@initialState');
  
    const currentUser = initialState?.currentUser;
    const fetchUserInfo = initialState?.fetchUserInfo;
  
    useEffect(() => {
      if (!currentUser) {
        fetchUserInfo?.().then((res) => {
          if (res) {
            setInitialState((s) => ({ ...s, currentUser: res }));
          }
        });
      }
    }, [currentUser, fetchUserInfo, setInitialState]);
  
    const handleClickLogin = async () => {
      // wxlogin();
    };
  
    const handleLogout = () => {
      // logout();
      console.log('logout');
      Cookies.remove('token');
      setInitialState((s) => ({ ...s, currentUser: null }));
      history.push('/login');
    };
  
    const getAvatar = () => {
      if (currentUser?.avatar) {
        const res = currentUser.avatar.startsWith('http') ? currentUser.avatar : `/public${currentUser.avatar}`;
        return res;
      }
      return '';
    };
  
    return (
      <Space className={`mr-4 cursor-pointer`}>
        {currentUser ? (
          <HeaderDropdown
            placement={isHome ? 'bottom' : ''}
            menu={{
              selectedKeys: [],
              onClick: (event) => {
                const { key } = event;
                console.log(key);
                if (key === 'center') {
                  history.push('/user/profile');
                }
  
                if (key === 'logout') {
                  handleLogout();
                }
              },
              items: [
                {
                  key: 'center',
                  icon: <UserOutlined />,
                  label: '个人中心',
                },
                {
                  type: 'divider' as const,
                },
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: '退出登录',
                },
              ],
            }}
          >
            <Space>
              <Avatar src={getAvatar()}></Avatar>
              {!isHome && <span>{currentUser.nickname}</span>}
            </Space>
          </HeaderDropdown>
        ) : (
          <Space onClick={handleClickLogin}>
            <LoginOutlined />
            <span>登录</span>
          </Space>
        )}
      </Space>
    );
  }
  