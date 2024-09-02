import { request } from '@umijs/max';
import {
  BaseListResult,
  BaseResult,
  Currency,
  CurrencyData,
  CurrencyListQueryParams,
} from '../types';

async function getCurrencies(
  query: CurrencyListQueryParams,
): Promise<BaseListResult<CurrencyData>> {
  return request('/api/v1/currency/list', {
    method: 'POST',
    data: query,
  });
}

async function addCurrency(data: Currency): Promise<BaseResult<CurrencyData>> {
  return request('/api/v1/currency/create', {
    method: 'POST',
    data,
  });
}

async function updateCurrency(
  data: CurrencyData,
): Promise<BaseResult<CurrencyData>> {
  return request(`/api/v1/currency/update`, {
    method: 'POST',
    data,
  });
}

async function deleteCurrency(data: { uuid: string }): Promise<BaseResult> {
  return request(`/api/v1/currency/delete`, {
    method: 'POST',
    data,
  });
}

async function getCurrencyOptions(): Promise<BaseResult<CurrencyData[]>> {
  return request('/api/v1/currency/all', {
    method: 'POST',
    data: {},
  });
}

export const currencyApi = {
  getCurrencies,
  addCurrency,
  updateCurrency,
  deleteCurrency,
  getCurrencyOptions,
};
