import { request } from '@umijs/max';

export async function getSysLoginLogs(query) {
  return request('/api/v1/sys_login_log/list', {
    method: 'POST',
    data: query,
  });
}
