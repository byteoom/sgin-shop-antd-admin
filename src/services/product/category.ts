import { request } from '@umijs/max';
import {
  BaseListResult,
  BaseResult,
  O_IDS,
  ProductCategory,
  ProductListQueryParams,
} from '../types';

// Fetch the list of product categories
async function getProductCategories(
  query: ProductListQueryParams,
): Promise<BaseListResult<ProductCategory>> {
  return request('/api/v1/product_category/list', {
    method: 'POST',
    data: query,
  });
}

// Create a new product category
async function addProductCategory(data: ProductCategory): Promise<BaseResult> {
  return request('/api/v1/product_category/create', {
    method: 'POST',
    data,
  });
}

// Update an existing product category
async function updateProductCategory(data: ProductCategory): Promise<BaseResult> {
  return request('/api/v1/product_category/update', {
    method: 'POST',
    data,
  });
}

// Delete a product category
async function deleteProductCategory(data: O_IDS) {
  return request('/api/v1/product_category/delete', {
    method: 'POST',
    data,
  });
}

// Get all product categories (assuming implementation in backend)
async function getAllProductCategories() {
  return request('/api/v1/product_category/all', {
    method: 'POST',
  });
}

export const categoryServices = {
  getProductCategories,
  addProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getAllProductCategories,
};
