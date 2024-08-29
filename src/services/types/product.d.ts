import { BaseQueryParams } from './common';
// 基础产品类型
interface ProductBase {
  weight: number; // 重量
  length: number; // 长度
  width: number; // 宽度
  height: number; // 高度
  unit: string; // 单位 例如: 个、件、套、箱
}

// 产品类型常量
// const ProductTypeSingle = 'single'; // 单个产品
// const ProductTypeVariant = 'variant'; // 变体产品
// const ProductTypeGroup = 'group'; // 组合产品

// 产品类型
export interface Product extends ProductBase {
  id: number; // ID
  uuid: string; // UUID
  product_category_uuid: string; // 产品分类UUID
  name: string; // 产品名称
  alias_name: string; // 产品别名
  description: string; // 产品描述
  product_type: string; // 产品类型 单个产品、变体产品、组合产品
  type: string; // 产品类型 全新、二手、虚拟产品
  status: string; // 产品状态 上架、下架、售罄
  stock_warning: number; // 产品警戒库存
  stock_warning_sell: boolean; // 低于警戒库存是否可售
  images: string; // 产品图片
  videos: string; // 产品视频
  currency_code: string; // 货币代码
  created_at: string; // 创建时间
  updated_at: string; // 最后更新时间
}

// 产品分类
export interface ProductCategory {
  id: number; // 分类ID
  uuid: string; // 分类UUID
  name: string; // 分类名称
  alias_name: string; // 别名
  icon: string; // 分类图标
  description: string; // 分类描述
  parent_uuid: string; // 父级分类UUID
  sort: number; // 排序
  status: number; // 状态 1:启用 2:禁用
  created_at: string; // 创建时间
  updated_at: string; // 最后更新时间
}

// 产品列表查询参数
export interface ProductListQueryParams extends BaseQueryParams {
  name?: string; // 产品名称
}
export interface ProductCategoryListQueryParams extends BaseQueryParams {
  end_time?: string; // 结束时间
  start_time?: string; // 开始时间
  name?: string; // 产品名称
}
