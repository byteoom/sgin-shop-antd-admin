import { request } from '@umijs/max';

export async function getEmailConfig() {
  return request('/api/v1/configuration/category_map', {
    method: 'POST',
    data:{category: 'email'},
  });
}

export async function updateEmailConfig(data) {
  return request('/api/v1/configuration/category_create_map', {
    method: 'POST',
    data: {...data, category: 'email'},
  });
}
