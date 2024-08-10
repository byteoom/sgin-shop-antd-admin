import { request } from '@umijs/max';

export async function getPermissionMenus(query) {
  return request('/api/v1/permission_menu/list', {
    method: 'POST',
    data: query,
  });
}

export async function addPermissionMenu(data) {
  return request('/api/v1/permission_menu/create', {
    method: 'POST',
    data,
  });
}

export async function updatePermissionMenu(data) {
  return request('/api/v1/permission_menu/update', {
    method: 'POST',
    data,
  });
}

export async function deletePermissionMenu(data) {
  return request('/api/v1/permission_menu/delete', {
    method: 'POST',
    data,
  });
}

export async function getPermissionMenuInfo(data) {
  return request('/api/v1/permission_menu/info', {
    method: 'POST',
    data,
  });
}


export async function getPermissionMenuInfoByPermissionUuid(data) {
    return request('/api/v1/permission_menu/info_menu', {
      method: 'POST',
      data,
    });
  }
  