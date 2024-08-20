import { request } from '@umijs/max';

// get all payments
export async function getPaymentList(query) {
    return request('/api/v1/payments/list', {
        method: 'POST',
        data:query
    });
}
