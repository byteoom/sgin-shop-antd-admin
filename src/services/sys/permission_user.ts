import { request } from '@umijs/max';

export async function getUserPermissions(query) {
  return request('/api/v1/permission_user/list', {
    method: 'POST',
    data: query,
  });
}

export async function addUserPermission(data) {
  return request('/api/v1/permission_user/create', {
    method: 'POST',
    data,
  });
}

export async function updateUserPermission(data) {
  return request('/api/v1/permission_user/update', {
    method: 'POST',
    data,
  });
}

export async function deleteUserPermission(data) {
  return request('/api/v1/permission_user/delete', {
    method: 'POST',
    data,
  });
}

export async function getUserPermissionInfo(data) {
  return request('/api/v1/permission_user/info', {
    method: 'POST',
    data,
  });
}
