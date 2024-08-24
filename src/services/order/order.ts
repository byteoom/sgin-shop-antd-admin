import { request } from '@umijs/max';

// 获取订单列表
export async function getOrders(query) {
  return request('/api/v1/order/list', {
    method: 'POST',
    data: query,
  });
}

// 创建订单
export async function createOrder(data) {
  return request('/api/v1/order/create', {
    method: 'POST',
    data,
  });
}

// 删除订单
export async function deleteOrder(data) {
  return request('/api/v1/order/delete', {
    method: 'POST',
    data,
  });
}

// 获取订单详情
export async function getOrder(data) {
  return request('/api/v1/order/info', {
    method: 'POST',
    data,
  });
}

// 获取订单商品列表
export async function getOrderItemList(data) {
  return request('/api/v1/order/item/list', {
    method: 'POST',
    data,
  });
}
