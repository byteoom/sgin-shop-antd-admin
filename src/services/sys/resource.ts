import { request } from '@umijs/max';

// 创建资源（文件或文件夹）
export async function createResource(data) {
  return request('/api/v1/resource/create', {
    method: 'POST',
    data,
  });
}

// 获取资源列表
export async function getResourceList(data) {
  return request('/api/v1/resource/list', {
    method: 'POST',
    data,
  });
}

// 更新资源
export async function updateResource(data) {
  return request('/api/v1/resource/update', {
    method: 'POST',
    data,
  });
}

// 删除资源
export async function deleteResource(data) {
  return request('/api/v1/resource/delete', {
    method: 'POST',
    data,
  });
}

// 创建文件夹
export async function createFolder(data) {
  return request('/api/v1/resource/create_folder', {
    method: 'POST',
    data,
  });
}

// 获取文件夹列表
export async function getFolderList(data) {
  return request('/api/v1/resource/folder_list', {
    method: 'POST',
    data,
  });
}

// 移动资源
export async function moveResource(data) {
  return request('/api/v1/resource/move', {
    method: 'POST',
    data,
  });
}
