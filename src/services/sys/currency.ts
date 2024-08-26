import { request } from '@umijs/max';

export async function getCurrencies(query) {
  return request('/api/v1/currency/list', {
    method: 'POST',
    data: query,
  });
}

export async function addCurrency(data) {
  return request('/api/v1/currency/create', {
    method: 'POST',
    data,
  });
}

export async function updateCurrency(data) {
  return request(`/api/v1/currency/update`, {
    method: 'POST',
    data,
  });
}

export async function deleteCurrency(data) {
  return request(`/api/v1/currency/delete`, {
    method: 'POST',
    data,
  });
}

export async function getCurrencyOptions() {
  return request('/api/v1/currency/all', {
    method: 'POST',
    data: {},
  });
}
