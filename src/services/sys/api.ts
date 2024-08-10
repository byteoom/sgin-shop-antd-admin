import { request } from '@umijs/max';

export async function getApis(query) {
  return request('/api/v1/sys_api/list', {
    method: 'POST',
    data: query,
  });
}

export async function addApi(data) {
  return request('/api/v1/sys_api/create', {
    method: 'POST',
    data,
  });
}

export async function updateApi(data) {
  return request('/api/v1/sys_api/update', {
    method: 'POST',
    data,
  });
}

export async function deleteApi(data) {
  return request('/api/v1/sys_api/delete', {
    method: 'POST',
    data,
  });
}

export async function getApi(data) {
  return request('/api/v1/sys_api/info', {
    method: 'POST',
    data,
  });
}

