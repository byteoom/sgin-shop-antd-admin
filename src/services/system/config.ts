import { request } from '@umijs/max';
import { EmailUpdata } from '../types';

async function getEmailConfig() {
  return request('/api/v1/configuration/category_map', {
    method: 'POST',
    data: { category: 'email' },
  });
}

async function updateEmailConfig(data: EmailUpdata) {
  return request('/api/v1/configuration/category_create_map', {
    method: 'POST',
    data: { ...data, category: 'email' },
  });
}

async function getSiteConfig() {
  return request('/api/v1/configuration/category_map', {
    method: 'POST',
    data: { category: 'site' },
  });
}

async function updateSiteConfig(data: any) {
  return request('/api/v1/configuration/category_create_map', {
    method: 'POST',
    data: { ...data, category: 'site' },
  });
}

export const configApi = {
  getEmailConfig,
  updateEmailConfig,
  getSiteConfig,
  updateSiteConfig,
};
