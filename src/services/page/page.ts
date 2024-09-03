import { request } from '@umijs/max';
import { Page, PageListQueryParams, BaseListResult, BaseResult } from '../types';

// 获取页面列表
async function getPages(
  query: PageListQueryParams,
): Promise<BaseListResult<Page>> {
  return request('/api/v1/page/list', {
    method: 'POST',
    data: query,
  });
}

// 创建页面
async function addPage(data: Page): Promise<BaseResult<Page>> {
  return request('/api/v1/page/create', {
    method: 'POST',
    data,
  });
}

// 更新页面
async function updatePage(data: Page): Promise<BaseResult<Page>> {
  return request('/api/v1/page/update', {
    method: 'POST',
    data,
  });
}

// 删除页面
async function deletePage(data: { uuid: string }): Promise<BaseResult> {
  return request('/api/v1/page/delete', {
    method: 'POST',
    data,
  });
}

// 获取单个页面信息
async function getPage(data: { uuid: string }): Promise<BaseResult<Page>> {
  return request('/api/v1/page/info', {
    method: 'POST',
    data,
  });
}

export const pageService = {
  getPages,
  addPage,
  updatePage,
  deletePage,
  getPage,
};
