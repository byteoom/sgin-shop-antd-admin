import { request } from '@umijs/max';
import {
  BaseListResult,
  BaseResult,
  O_IDS,
  Permission,
  ReqMenuPermissionCreate,
  ReqMenuPermissionListQueryParams,
  ReqPermissionListQueryParams,
  ReqUserPermissionCreate,
  ReqUserPermissionListQueryParams,
} from '../types';

async function getPermissions(
  query?: ReqPermissionListQueryParams,
): Promise<BaseListResult<Permission>> {
  return request('/api/v1/permission/list', {
    method: 'POST',
    data: query,
  });
}

async function addPermission(
  data: Permission,
): Promise<BaseResult<Permission>> {
  return request('/api/v1/permission/create', {
    method: 'POST',
    data,
  });
}

async function updatePermission(
  data: Permission,
): Promise<BaseResult<Permission>> {
  return request('/api/v1/permission/update', {
    method: 'POST',
    data,
  });
}

async function deletePermission(data: O_IDS): Promise<BaseResult> {
  return request('/api/v1/permission/delete', {
    method: 'POST',
    data,
  });
}

async function getPermissionInfo(data: O_IDS): Promise<BaseResult<Permission>> {
  return request('/api/v1/permission/info', {
    method: 'POST',
    data,
  });
}

/**---user--- */

async function getUserPermissions(query: ReqUserPermissionListQueryParams) {
  return request('/api/v1/permission_user/list', {
    method: 'POST',
    data: query,
  });
}

async function addUserPermission(data: ReqUserPermissionCreate) {
  return request('/api/v1/permission_user/create', {
    method: 'POST',
    data,
  });
}

async function updateUserPermission(data: ReqUserPermissionCreate) {
  return request('/api/v1/permission_user/update', {
    method: 'POST',
    data,
  });
}

async function deleteUserPermission(data: O_IDS) {
  return request('/api/v1/permission_user/delete', {
    method: 'POST',
    data,
  });
}

async function getUserPermissionInfo(data: O_IDS) {
  return request('/api/v1/permission_user/info', {
    method: 'POST',
    data,
  });
}

/** menu */

async function getPermissionMenus(query: ReqMenuPermissionListQueryParams) {
  return request('/api/v1/permission_menu/list', {
    method: 'POST',
    data: query,
  });
}

async function addPermissionMenu(data: ReqMenuPermissionCreate) {
  return request('/api/v1/permission_menu/create', {
    method: 'POST',
    data,
  });
}

async function updatePermissionMenu(data: ReqMenuPermissionCreate) {
  return request('/api/v1/permission_menu/update', {
    method: 'POST',
    data,
  });
}

async function deletePermissionMenu(data: O_IDS) {
  return request('/api/v1/permission_menu/delete', {
    method: 'POST',
    data,
  });
}

async function getPermissionMenuInfo(data: O_IDS) {
  return request('/api/v1/permission_menu/info', {
    method: 'POST',
    data,
  });
}

async function getPermissionMenuInfoByPermissionUuid(data: O_IDS) {
  return request('/api/v1/permission_menu/info_menu', {
    method: 'POST',
    data,
  });
}

export const permissionApi = {
  getPermissions,
  addPermission,
  updatePermission,
  deletePermission,
  getPermissionInfo,
  getUserPermissions,
  addUserPermission,
  updateUserPermission,
  deleteUserPermission,
  getUserPermissionInfo,
  getPermissionMenus,
  addPermissionMenu,
  updatePermissionMenu,
  deletePermissionMenu,
  getPermissionMenuInfo,
  getPermissionMenuInfoByPermissionUuid,
};
