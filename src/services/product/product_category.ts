import { request } from '@umijs/max';

// Fetch the list of product categories
export async function getProductCategories(query) {
  return request('/api/v1/product_category/list', {
    method: 'POST',
    data: query,
  });
}

// Create a new product category
export async function addProductCategory(data) {
  return request('/api/v1/product_category/create', {
    method: 'POST',
    data,
  });
}

// Update an existing product category
export async function updateProductCategory(data) {
  return request('/api/v1/product_category/update', {
    method: 'POST',
    data,
  });
}

// Delete a product category
export async function deleteProductCategory(data) {
  return request('/api/v1/product_category/delete', {
    method: 'POST',
    data,
  });
}

// Get all product categories (assuming implementation in backend)
export async function getAllProductCategories() {
  return request('/api/v1/product_category/all', {
    method: 'POST',
  });
}
