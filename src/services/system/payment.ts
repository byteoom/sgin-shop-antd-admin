/**
 * 支付相关
 */

import { request } from '@umijs/max';
import {
  BaseListResult,
  BaseResult,
  O_IDS,
  PaymentMethod,
  PaymentMethodQueryParams,
  PaymentMethodStatusUpdate,
} from '../types';

export async function getPaymentMethodList(
  query: PaymentMethodQueryParams,
): Promise<BaseListResult<PaymentMethod>> {
  return request('/api/v1/payment_method/list', {
    method: 'POST',
    data: query,
  });
}

export async function createPaymentMethod(
  data: PaymentMethod,
): Promise<BaseResult<PaymentMethod>> {
  return request('/api/v1/payment_method/create', {
    method: 'POST',
    data,
  });
}

export async function updatePaymentMethodStatus(
  data: PaymentMethodStatusUpdate,
): Promise<BaseResult<PaymentMethod>> {
  return request('/api/v1/payment_method/update_status', {
    method: 'POST',
    data,
  });
}

export async function updatePaymentMethodConfig(data: any) {
  return request('/api/v1/payment_method/update_config', {
    method: 'POST',
    data,
  });
}

export async function getPaymentMethodInfo(
  data: O_IDS,
): Promise<BaseResult<PaymentMethod>> {
  return request('/api/v1/payment_method/info', {
    method: 'POST',
    data,
  });
}

function fetchPayPalClientId(env: any) {
  return request('/api/v1/payment_method/paypal/client_id', {
    method: 'POST',
    data: { env: env },
  });
}

// requestPayPalPayment
function requestPayPalPayment(data: any) {
  return request('/api/v1/payment_method/paypal/sandbox/create_test', {
    method: 'POST',
    data,
  });
}

// 设置支付宝配置
function updateAlipayConfig(data: any) {
  return request('/api/v1/payment_method/alipay/config', {
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export const paymentApi = {
  getPaymentMethodList,
  createPaymentMethod,
  updatePaymentMethodStatus,
  updatePaymentMethodConfig,
  getPaymentMethodInfo,
  fetchPayPalClientId,
  requestPayPalPayment,
  updateAlipayConfig,
};
