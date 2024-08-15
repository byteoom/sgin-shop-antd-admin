import { request } from '@umijs/max';

// 创建一个新的产品
export async function addProduct(data) {
  return request('/api/v1/product/create', {
    method: 'POST',
    data,
  });
}


export async function getProducts(query) {
  return request('/api/v1/product/list', {
    method: 'POST',
    data: query,
  });
}


export async function updateProduct(data) {
  return request('/api/v1/product/update', {
    method: 'POST',
    data,
  });
}

export async function deleteProduct(data) {
  return request('/api/v1/product/delete', {
    method: 'POST',
    data,
  });
}

export async function getProduct(data) {
  return request('/api/v1/product/info', {
    method: 'POST',
    data,
  });
}


export async function getProductItems(data) {
  return request('/api/v1/product/item/list', {
    method: 'POST',
    data,
  });
}

export async function deleteProductItem(data) {
  return request('/api/v1/product/item/delete', {
    method: 'POST',
    data,
  });
}

// getProductItem
export async function getProductItem(data) {
  return request('/api/v1/product/item/info', {
    method: 'POST',
    data,
  });
}

// updateProductItem
export async function updateProductItem(data) {
  return request('/api/v1/product/item/update', {
    method: 'POST',
    data,
  });
}