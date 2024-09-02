import { request } from '@umijs/max';
import {
  BaseListResult,
  BaseResult,
  ReqResourceCreateFolder,
  ReqResourceMove,
  ReqResourceQueryParam,
  Resource,
} from '../types';

// 创建资源（文件或文件夹）
async function createResource(data: FormData): Promise<BaseResult<Resource>> {
  return request('/api/v1/resource/create', {
    method: 'POST',
    data,
  });
}

// 获取资源列表
async function getResourceList(
  data: ReqResourceQueryParam,
): Promise<BaseListResult<Resource>> {
  return request('/api/v1/resource/list', {
    method: 'POST',
    data,
  });
}

// 更新资源
async function updateResource(data: Resource): Promise<BaseResult<Resource>> {
  return request('/api/v1/resource/update', {
    method: 'POST',
    data,
  });
}

// 删除资源
async function deleteResource(data: {
  uuid: string; // 资源UUID
}): Promise<BaseResult> {
  return request('/api/v1/resource/delete', {
    method: 'POST',
    data,
  });
}

// 创建文件夹
async function createFolder(data: ReqResourceCreateFolder) {
  return request('/api/v1/resource/create_folder', {
    method: 'POST',
    data,
  });
}

// 获取文件夹列表
async function getFolderList(data: any) {
  return request('/api/v1/resource/folder_list', {
    method: 'POST',
    data,
  });
}

// 移动资源
async function moveResource(data: ReqResourceMove) {
  return request('/api/v1/resource/move', {
    method: 'POST',
    data,
  });
}

export const resourceApi = {
  createResource,
  getResourceList,
  updateResource,
  deleteResource,
  createFolder,
  getFolderList,
  moveResource,
};
