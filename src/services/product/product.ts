import { request } from '@umijs/max';

// 创建一个新的产品
export async function addProduct(data) {
  return request('/api/v1/product/create', {
    method: 'POST',
    data,
  });
}