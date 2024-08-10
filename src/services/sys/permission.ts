import { request } from '@umijs/max';

export async function getPermissions(query) {
  return request('/api/v1/permission/list', {
    method: 'POST',
    data: query,
  });
}

export async function addPermission(data) {
  return request('/api/v1/permission/create', {
    method: 'POST',
    data,
  });
}

export async function updatePermission(data) {
  return request('/api/v1/permission/update', {
    method: 'POST',
    data,
  });
}

export async function deletePermission(data) {
  return request('/api/v1/permission/delete', {
    method: 'POST',
    data,
  });
}

export async function getPermissionInfo(data) {
  return request('/api/v1/permission/info', {
    method: 'POST',
    data,
  });
}
