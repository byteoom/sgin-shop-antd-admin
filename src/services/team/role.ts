import { request } from '@umijs/max';

// 获取角色列表
export async function getRoles(params) {
  return request('/api/v1/role/list', {
    method: 'POST',
    data: params,
  });
}

// 创建角色
export async function addRole(data) {
  return request('/api/v1/role/create', {
    method: 'POST',
    data,
  });
}

// 更新角色
export async function updateRole(data) {
  return request('/api/v1/role/update', {
    method: 'POST',
    data,
  });
}

// 删除角色
export async function deleteRole(data) {
  return request('/api/v1/role/delete', {
    method: 'POST',
    data,
  });
}
