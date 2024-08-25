import { request } from '@umijs/max';

export async function getSiteConfig() {
  return request('/api/v1/configuration/category_map', {
    method: 'POST',
    data:{category: 'site'},
  });
}

export async function updateSiteConfig(data) {
  return request('/api/v1/configuration/category_create_map', {
    method: 'POST',
    data: {...data, category: 'site'},
  });
}
