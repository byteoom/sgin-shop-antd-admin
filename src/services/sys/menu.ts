import { request } from '@umijs/max';

export async function getMenus(query) {
  return request('/api/v1/menu/list', {
    method: 'POST',
    data: query,
  });
}

export async function addMenu(data) {
  return request('/api/v1/menu/create', {
    method: 'POST',
    data,
  });
}

export async function updateMenu(data) {
  return request(`/api/v1/menu/update`, {
    method: 'POST',
    data,
  });
}

export async function deleteMenu(data) {
  return request(`/api/v1/menu/delete`, {
    method: 'POST',
    data,
  });
}

export async function getMenuInfo(data) {
  return request(`/api/v1/menu/info`, {
    method: 'POST',
    data,
  });
}