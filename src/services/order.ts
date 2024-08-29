import { request } from '@umijs/max';
import {
  BaseListResult,
  BaseResult,
  O_IDS,
  Order,
  OrderItem,
  OrderQueryParams,
} from './types';

// 获取订单列表
async function getOrders(
  query: OrderQueryParams,
): Promise<BaseListResult<Order>> {
  return request('/api/v1/order/list', {
    method: 'POST',
    data: query,
  });
}

// 创建订单
async function createOrder(data: Order): Promise<BaseResult> {
  return request('/api/v1/order/create', {
    method: 'POST',
    data,
  });
}

// 删除订单
async function deleteOrder(data: O_IDS): Promise<BaseResult> {
  return request('/api/v1/order/delete', {
    method: 'POST',
    data,
  });
}

// 获取订单详情
async function getOrder(data: O_IDS): Promise<BaseResult> {
  return request('/api/v1/order/info', {
    method: 'POST',
    data,
  });
}

// 获取订单商品列表
async function getOrderItemList(
  data: O_IDS,
): Promise<BaseListResult<OrderItem>> {
  return request('/api/v1/order/item/list', {
    method: 'POST',
    data,
  });
}

export const orderServices = {
  getOrders,
  createOrder,
  deleteOrder,
  getOrder,
  getOrderItemList,
};
