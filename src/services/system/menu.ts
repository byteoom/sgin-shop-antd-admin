import { request } from '@umijs/max';
import {
  BaseListResult,
  BaseResult,
  Menu,
  MenuApi,
  MenuQueryParams,
  O_IDS,
  ReqMenuCreate,
} from '../types';

async function getMenus(
  query?: MenuQueryParams,
): Promise<BaseListResult<Menu>> {
  return request('/api/v1/menu/list', {
    method: 'POST',
    data: query,
  });
}

async function addMenu(data: Menu): Promise<BaseResult<Menu>> {
  return request('/api/v1/menu/create', {
    method: 'POST',
    data,
  });
}

async function updateMenu(data: Menu): Promise<BaseResult<Menu>> {
  return request(`/api/v1/menu/update`, {
    method: 'POST',
    data,
  });
}

async function deleteMenu(data: { uuid: string }): Promise<BaseResult> {
  return request(`/api/v1/menu/delete`, {
    method: 'POST',
    data,
  });
}

async function getMenuInfo(data: { uuid: string }): Promise<BaseResult<Menu>> {
  return request(`/api/v1/menu/info`, {
    method: 'POST',
    data,
  });
}

/** 菜单绑定权限 **/

async function getMenuAPIs(query: {
  uuid: string;
}): Promise<BaseListResult<Menu>> {
  return request('/api/v1/menu_api/list', {
    method: 'POST',
    data: query,
  });
}

async function addMenuAPI(
  data: ReqMenuCreate,
): Promise<BaseResult<ReqMenuCreate>> {
  return request('/api/v1/menu_api/create', {
    method: 'POST',
    data,
  });
}

async function updateMenuAPI(
  data: ReqMenuCreate,
): Promise<BaseResult<ReqMenuCreate>> {
  return request('/api/v1/menu_api/update', {
    method: 'POST',
    data,
  });
}

async function deleteMenuAPI(data: O_IDS): Promise<BaseResult> {
  return request('/api/v1/menu_api/delete', {
    method: 'POST',
    data,
  });
}

async function getMenuAPIInfo(data: O_IDS): Promise<BaseResult<ReqMenuCreate>> {
  return request('/api/v1/menu_api/info', {
    method: 'POST',
    data,
  });
}

async function getMenuAPIListByMenuUUID(
  data: O_IDS,
): Promise<BaseListResult<MenuApi>> {
  return request('/api/v1/menu_api/info_menu', {
    method: 'POST',
    data,
  });
}

async function getMenuAPIListByAPIUUID(
  data: O_IDS,
): Promise<BaseListResult<MenuApi>> {
  return request('/api/v1/menu_api/info_api', {
    method: 'POST',
    data,
  });
}

export const menuApi = {
  getMenus,
  addMenu,
  updateMenu,
  deleteMenu,
  getMenuInfo,
  getMenuAPIs,
  addMenuAPI,
  updateMenuAPI,
  deleteMenuAPI,
  getMenuAPIInfo,
  getMenuAPIListByMenuUUID,
  getMenuAPIListByAPIUUID,
};
