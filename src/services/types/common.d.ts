/**
 * 基础请求返回
 * */
export interface BaseResult<T = any> {
  code: number;
  message: string;
  data: T;
  trace_id: string;
}

/**
 * 基础查询
 */

export interface BaseQueryParams {
  /**
   * 当前页面
   */
  current: number;
  /**
   * 每页数量
   */
  pageSize: number;
  /**
   * 开始时间
   */
  start_time?: string;
  /**
   * 结束时间
   */
  end_time?: string;
}

/**
 * 基础列表返回值
 */
export interface ListResult<T = any> {
  /**
   * 列表
   */
  data: T[];
  /**
   * 总数
   */
  total: number;
  current: number;
  pageSize: number;
}

export type BaseListResult<T = any> = BaseResult<ListResult<T>>;

// uuid
export type O_UUID = string;
//
export type O_UUIDS = UUID[];
// export type O_IDS = UUID | UUIDS;

export type O_IDS = {
  uuid?: string;
  uuids?: string[];
};
