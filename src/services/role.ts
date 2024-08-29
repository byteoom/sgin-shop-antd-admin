import { request } from '@umijs/max';
import {
  BaseListResult,
  BaseResult,
  O_IDS,
  Role,
  TeamQueryParams,
} from './types';

// 获取角色列表
async function getRoles(
  params: TeamQueryParams,
): Promise<BaseListResult<Role>> {
  return request('/api/v1/role/list', {
    method: 'POST',
    data: params,
  });
}

// 创建角色
async function addRole(data: Role): Promise<BaseResult> {
  return request('/api/v1/role/create', {
    method: 'POST',
    data,
  });
}

// 更新角色
async function updateRole(data: Role): Promise<BaseResult> {
  return request('/api/v1/role/update', {
    method: 'POST',
    data,
  });
}

// 删除角色
async function deleteRole(data: O_IDS): Promise<BaseResult> {
  return request('/api/v1/role/delete', {
    method: 'POST',
    data,
  });
}

export const roleService = { getRoles, addRole, updateRole, deleteRole };
