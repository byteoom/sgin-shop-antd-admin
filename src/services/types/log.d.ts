export interface LoginLogQueryParams extends BaseQueryParams {
  username: string;
}

export interface LoginLog {
  address: string;
  browser: string;
  created_at: string;
  device: string;
  id: number;
  ip: string;
  message: string;
  os: string;
  status: number;
  user_agent: string;
  username: string;
}

/**
 * 操作日志查询参数
 */
export interface OpLogQueryParams extends BaseQueryParams {
  method: string;
  path: string;
  status: 0;
  user_name: string;
}

/**
 * 操作日志
 */
export interface OpLog {
  code: number;
  created_at: string;
  duration: number;
  id: number;
  ip: string;
  message: string;
  method: string;
  params: string;
  path: string;
  request_id: string;
  status: number;
  user_uuid: string;
}
