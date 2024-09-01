import { O_UUID } from './common';

/**
 * 支付方法查询参数
 */
export interface PaymentMethodQueryParams extends BaseQueryParams {
  name: string;
}

/**
 * 支付方法
 */
export interface PaymentMethod {
  code: string;
  config: string;
  description: string;
  icon: string;
  id: number;
  name: string;
  status: number;
  url: string;
  uuid: string;
}
/**
 * 支付方法状态更新
 */
export interface PaymentMethodStatusUpdate {
  uuid: O_UUID;
  status: number;
}
