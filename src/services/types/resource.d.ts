import { BaseQueryParams } from './common';

export interface Resource {
  id: number; // 资源ID
  uuid: string; // 资源唯一标识符
  name: string; // 资源名称
  description: string; // 资源描述
  parent_uuid: string; // 父级资源UUID
  md5: string; // 文件MD5
  type: ResourceType; // 资源类型 文件夹、文件 等
  mime_type: string; // 文件类型
  size: number; // 文件大小
  path: string; // 文件路径
  address: string; // 文件地址
  created_at: string; // 创建时间
  updated_at: string; // 最后更新时间
}

// 资源查询参数请求体
export interface ReqResourceQueryParam extends BaseQueryParams {
  path?: string; // 资源路径
  name?: string; // 资源名称
  parent_uuid?: string; // 父级资源UUID
  mime_type?: string; // 文件类型
}

export interface ReqResourceCreateFolder {
  name: string; // 文件夹名称
  description?: string; // 文件夹描述
  path: string; // 文件夹路径
}

export interface ReqResourceMove {
  uuid_list: string[]; // 资源UUID列表
  parent_uuid: string; // 父级资源UUID
}
