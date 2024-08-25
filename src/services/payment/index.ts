import { request } from '@umijs/max';

export async function fetchPayPalClientId(env) {
  return request('/api/v1/payment_method/paypal/client_id', {
    method: 'POST',
    data: {"env": env},
  });
}


// requestPayPalPayment
export async function requestPayPalPayment(data) {
  return request('/api/v1/payment_method/paypal/sandbox/create_test', {
    method: 'POST',
    data,
  });
}