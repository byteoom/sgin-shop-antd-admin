import { request } from '@umijs/max';

export async function getMenuAPIs(query) {
  return request('/api/v1/menu_api/list', {
    method: 'POST',
    data: query,
  });
}

export async function addMenuAPI(data) {
  return request('/api/v1/menu_api/create', {
    method: 'POST',
    data,
  });
}

export async function updateMenuAPI(data) {
  return request('/api/v1/menu_api/update', {
    method: 'POST',
    data,
  });
}

export async function deleteMenuAPI(data) {
  return request('/api/v1/menu_api/delete', {
    method: 'POST',
    data,
  });
}

export async function getMenuAPIInfo(data) {
  return request('/api/v1/menu_api/info', {
    method: 'POST',
    data,
  });
}

export async function getMenuAPIListByMenuUUID(data) {
  return request('/api/v1/menu_api/info_menu', {
    method: 'POST',
    data,
  });
}

export async function getMenuAPIListByAPIUUID(data) {
  return request('/api/v1/menu_api/info_api', {
    method: 'POST',
    data,
  });
}
