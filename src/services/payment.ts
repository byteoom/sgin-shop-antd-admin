import { request } from '@umijs/max';

async function fetchPayPalClientId(env: any) {
  return request('/api/v1/payment_method/paypal/client_id', {
    method: 'POST',
    data: { env: env },
  });
}

// requestPayPalPayment
async function requestPayPalPayment(data: any) {
  return request('/api/v1/payment_method/paypal/sandbox/create_test', {
    method: 'POST',
    data,
  });
}

export const paymentService = {
  fetchPayPalClientId,
  requestPayPalPayment,
};
