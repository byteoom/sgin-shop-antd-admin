import { BaseQueryParams } from './common';

/**
 * 货币
 */
export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

/**
 * 货币数据
 */
export interface CurrencyData extends Currency {
  id: number;
  status: number;
  uuid: string;
}

/**
 * 货币列表查询参数
 */
export interface CurrencyListQueryParams extends BaseQueryParams {
  name?: string;
}
