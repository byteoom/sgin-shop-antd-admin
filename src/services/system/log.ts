import { request } from '@umijs/max';
import {
  BaseListResult,
  LoginLog,
  LoginLogQueryParams,
  OpLog,
  OpLogQueryParams,
} from '../types';

/**
 * 登陆日志
 */
async function getSysLoginLogs(
  query: LoginLogQueryParams,
): Promise<BaseListResult<LoginLog>> {
  return request('/api/v1/sys_login_log/list', {
    method: 'POST',
    data: query,
  });
}

/**
 * 操作日志
 */
async function getSysOpLogs(
  query: OpLogQueryParams,
): Promise<BaseListResult<OpLog>> {
  return request('/api/v1/sysoplog/list', {
    method: 'POST',
    data: query,
  });
}

export const logApi = {
  getSysLoginLogs,
  getSysOpLogs,
};
