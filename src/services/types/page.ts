import { BaseQueryParams } from './common';

// Page.ts
export interface Page {
    id: number;             // ID 是页面的主键
    uuid: string;           // UUID 是页面的唯一标识符
    title: string;          // Title 是页面的标题
    slug: string;           // Slug 是页面的路径 (URL)
    status: string;         // Status 是页面的状态 (如 "draft", "published")
    data: string;           // Data 存储页面的详细内容，较大字符串
    ext: string;            // Ext 存储页面的扩展内容，较大字符串
    createdAt: string;      // CreatedAt 页面创建时间
    updatedAt: string;      // UpdatedAt 页面最后更新时间
  }
  
  // 页面列表查询参数
    export interface PageListQueryParams extends BaseQueryParams {
        title?: string;         // Title 是页面的标题
    }