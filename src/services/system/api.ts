import { request } from '@umijs/max';
import { Api, ApiListQueryParams, BaseListResult, BaseResult } from '../types';

async function getApis(
  query: ApiListQueryParams,
): Promise<BaseListResult<Api>> {
  return request('/api/v1/sys_api/list', {
    method: 'POST',
    data: query,
  });
}

async function addApi(data: Api): Promise<BaseResult<Api>> {
  return request('/api/v1/sys_api/create', {
    method: 'POST',
    data,
  });
}

async function updateApi(data: Api): Promise<BaseResult<Api>> {
  return request('/api/v1/sys_api/update', {
    method: 'POST',
    data,
  });
}

async function deleteApi(data: { uuid: string }): Promise<BaseResult> {
  return request('/api/v1/sys_api/delete', {
    method: 'POST',
    data,
  });
}

async function getApi(data: { uuid: string }): Promise<BaseResult<Api>> {
  return request('/api/v1/sys_api/info', {
    method: 'POST',
    data,
  });
}

export const apiApi = {
  getApis,
  addApi,
  updateApi,
  deleteApi,
  getApi,
};
