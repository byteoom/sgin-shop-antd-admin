// 运行时配置
import type { AxiosError, RequestConfig, RequestOptions } from '@umijs/max';
import { history } from '@umijs/max';
import Cookies from 'js-cookie';
import RightContent from '@/components/RightContent';
import { getMyUserInfo } from '@/services/user';
import Footer from '@/components/Footer';


const loginPath = '/user/login';


// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ 
  
   currentUser?: API.User;
   fetchUserInfo?: () => Promise<API.User | undefined>;
  }> {

    const fetchUserInfo = async () => {
      try {
        const userInfo = await getMyUserInfo();
        if(userInfo.code !== 200){
          history.push(loginPath);
          return undefined;
        }
        return userInfo.data;
      } catch (error) {
        history.push(loginPath);
      }
      return undefined;
    };
    // 如果是登录页面，不执行
    if (history.location.pathname !== loginPath) {
      const currentUser = await fetchUserInfo();
      return {
        currentUser,
        fetchUserInfo,
      };
    }

  return {fetchUserInfo};
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    layout: 'mix',
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
  };
};



export const request: RequestConfig = {
  withCredentials: true,
  requestInterceptors: [
    (config: RequestOptions) => {
      let currentToken = Cookies.get('token');
      if (!currentToken || currentToken === 'undefined') {
        console.log('token不存在');
      }
      return {
        ...config,
        headers: {
          ...config.headers,
          'X-Token': currentToken,
        },
      };
    },
  ],
  errorConfig: {
    errorHandler: (error, opts) => {
      if (opts?.skipErrorHandler) throw error;
      const { response } = error as AxiosError<unknown, unknown>;

      if (response && response.status !== 200) {
        // 请求已发送但服务端返回状态码非200系列
        console.log('response faile:', response);
      } else if (!response) {
        // 请求尚未发送就失败，网络问题或者请求被阻止等原因
        console.log('failed');
      }
      throw error; // 如果throw. 错误将继续抛出.
    },
  },
};
