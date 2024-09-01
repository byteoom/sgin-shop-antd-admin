/**
 * api列表查询接口
 */

import { BaseQueryParams } from './common';

export interface ApiListQueryParams extends BaseQueryParams {
  module: string;
  name: string;
  status: number;
}

export interface Api {
  created_at: string;
  id: number;
  method: string;
  module: string;
  name: string;
  path: string;
  permission_level: number;
  server_uuid: string;
  status: number;
  updated_at: string;
  uuid: string;
}
