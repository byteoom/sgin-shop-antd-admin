import { request } from '@umijs/max';

export async function getSysOpLogs(query) {
  return request('/api/v1/sysoplog/list', {
    method: 'POST',
    data: query,
  });
}
