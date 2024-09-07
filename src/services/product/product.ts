import { request } from '@umijs/max';
import {
  BaseListResult,
  BaseResult,
  O_IDS,
  O_UUIDS,
  Product,
  ProductCategory,
  ProductCategoryListQueryParams,
  ProductListQueryParams,
  ProductVariant,
} from '../types';

// 创建一个新的产品
async function addProduct(data: Product): Promise<BaseResult> {
  return request('/api/v1/product/create', {
    method: 'POST',
    data,
  });
}

async function getProducts(
  query: ProductListQueryParams,
): Promise<BaseListResult<Product>> {
  return request('/api/v1/product/list', {
    method: 'POST',
    data: query,
  });
}

export async function updateProduct(data: Product): Promise<BaseResult> {
  return request('/api/v1/product/update', {
    method: 'POST',
    data,
  });
}

async function deleteProduct(ids: O_UUIDS): Promise<BaseResult> {
  return request('/api/v1/product/delete', {
    method: 'POST',
    data: ids,
  });
}

async function getProduct(data: O_IDS): Promise<BaseResult<Product>> {
  return request('/api/v1/product/info', {
    method: 'POST',
    data,
  });
}

async function getProductItems(
  params: ProductCategoryListQueryParams,
): Promise<BaseListResult<ProductCategory>> {
  return request('/api/v1/product/item/list', {
    method: 'POST',
    data: params,
  });
}

async function deleteProductItem(data: O_UUIDS): Promise<BaseResult> {
  return request('/api/v1/product/item/delete', {
    method: 'POST',
    data,
  });
}

// getProductItem
async function getProductItem(
  data: O_IDS,
): Promise<BaseResult<ProductCategory>> {
  return request('/api/v1/product/item/info', {
    method: 'POST',
    data,
  });
}

// updateProductItem
async function updateProductItem(data: ProductCategory): Promise<BaseResult> {
  return request('/api/v1/product/item/update', {
    method: 'POST',
    data,
  });
}

// 获取产品变体信息
async function getProductVariantById(
  data: O_IDS,
): Promise<BaseResult<ProductVariant[]>> {
  return request('/api/v1/product/variant/info', {
    method: 'POST',
    data,
  });
}

export const productServices = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductItems,
  deleteProductItem,
  getProductItem,
  updateProductItem,
  getProductVariantById,
};
