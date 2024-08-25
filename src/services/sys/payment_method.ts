import { request } from '@umijs/max';

export async function getPaymentMethodList(query) {
  return request('/api/v1/payment_method/list', {
    method: 'POST',
    data: query,
  });
}

export async function createPaymentMethod(data) {
  return request('/api/v1/payment_method/create', {
    method: 'POST',
    data,
  });
}

export async function updatePaymentMethodStatus(data) {
  return request('/api/v1/payment_method/update_status', {
    method: 'POST',
    data,
  });
}

export async function updatePaymentMethodConfig(data) {
  return request('/api/v1/payment_method/update_config', {
    method: 'POST',
    data,
  });
}

export async function getPaymentMethodInfo(data) {
  return request('/api/v1/payment_method/info', {
    method: 'POST',
    data,
  });
}
