// 基础产品类型
interface ProductBase {
    weight: number; // 重量
    length: number; // 长度
    width: number; // 宽度
    height: number; // 高度
    unit: string; // 单位 例如: 个、件、套、箱
}

// 产品类型常量
const ProductTypeSingle = 'single'; // 单个产品
const ProductTypeVariant = 'variant'; // 变体产品
const ProductTypeGroup = 'group'; // 组合产品

// 产品类型
interface Product extends ProductBase {
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
interface ProductCategory {
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

// 产品展示类型
interface ProductRes extends Product {
    image_list: string[]; // 产品图片地址列表
    product_category: ProductCategory; // 产品分类
}

// 前端展示的产品类型
interface ProductShow {
    id: number; // 产品ID
    product_uuid: string; // 产品UUID
    product_item_uuid: string; // 产品项UUID
    product_type: string; // 产品类型 单个产品、变体产品、组合产品
    name: string; // 产品名称
    description: string; // 产品描述
    price: number; // 产品价格
    discount: number; // 产品折扣
    discount_price: number; // 产品折扣价
    stock: number; // 产品库存
    images: string[]; // 产品图片
    videos: string[]; // 产品视频
    product_category_uuid: string; // 产品分类UUID
    type: string; // 产品类型 全新、二手、虚拟产品
}

// 产品具体信息响应类型
interface ProductItemRes extends ProductItem {
    image_list: string[]; // 产品图片地址
    product_info: ProductRes | null; // 产品信息
}

// 展示产品项类型
interface ProductShowItem extends ProductShow {
    product_variants: ProductVariants[]; // 产品变体
    product_variants_option: ProductVariantsOption[]; // 产品变体选项
    product_items: ProductItemRes[]; // 产品项
}

// 产品变体
interface ProductVariants {
    id: number; // ID
    uuid: string; // UUID
    product_uuid: string; // 产品UUID
    name: string; // 产品变体名称
    description: string; // 产品变体描述
    created_at: string; // 创建时间
    updated_at: string; // 最后更新时间
}

// 产品变体Option
interface ProductVariantsOption {
    id: number; // ID
    uuid: string; // UUID
    product_uuid: string; // 产品UUID
    product_variants_uuid: string; // 产品变体UUID
    name: string; // 产品变体Option名称
    unit: string; // 单位 例如: 个、件、套、箱
    description: string; // 产品变体Option描述
    created_at: string; // 创建时间
    updated_at: string; // 最后更新时间
}

// 产品具体信息
interface ProductItem extends ProductBase {
    id: number; // ID
    uuid: string; // UUID
    name: string; // 产品名称
    product_uuid: string; // 产品UUID
    product_variants_uuid: string; // 产品变体UUID
    product_variants_option_uuid: string; // 变体optionUUID
    product_variants_option_value_uuid: string; // 变体option值UUID
    currency_code: string; // 货币代码
    variants: string; // 产品变体信息
    images: string; // 产品图片
    videos: string; // 产品视频
    description: string; // 产品描述
    price: number; // 产品价格
    discount: number; // 产品折扣
    discount_price: number; // 产品折扣价
    stock: number; // 产品库存
    created_at: string; // 创建时间
    updated_at: string; // 最后更新时间
}

// 产品创建
interface ReqProductCreate {
    name: string; // 产品名称
    alias_name: string; // 产品别名
    product_category_uuid: string; // 产品分类UUID
    product_type: string; // 产品类型 单个产品、变体产品、组合产品
    description: string; // 产品描述
    images: string[]; // 产品图片
    currency_code: string; // 货币代码
    videos: string[]; // 产品视频
    variants: ReqProductVariantsCreate[]; // 产品变体
    variants_vals: Record<string, any>[]; // 产品变体值
    unit: string; // 单位 例如: 个、件、套、箱
    product_status: string; // 产品状态 上架、下架、售罄
    stock_warning: number; // 预警库存
    stock_warning_sell: boolean; // 低于警戒库存是否可售
    length: number; // 长度
    width: number; // 宽度
    height: number; // 高度
    weight: number; // 重量
}

// 产品变体创建
interface ReqProductVariantsCreate {
    name: string; // 产品变体名称
    description: string; // 产品变体描述
    options: string[]; // 产品变体Option
}

// 产品变体Option创建
interface ReqProductVariantsOptionCreate {
    name: string; // 产品变体Option名称
    unit: string; // 单位 例如: 个、件、套、箱
    description: string; // 产品变体Option描述
}
