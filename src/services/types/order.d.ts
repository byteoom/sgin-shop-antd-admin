// 订单状态常量

import { OrderStatus } from '../../constants/order';
import { BaseQueryParams } from './common';

// 订单信息
interface Order {
  id: number; // 订单ID
  order_no: string; // 订单编号
  user_id: string; // 用户ID
  total_amount: number; // 订单总金额
  status: OrderStatus; // 订单状态
  receiver_name: string; // 收货人姓名
  receiver_phone: string; // 收货人电话
  receiver_email: string; // 收货人邮箱
  receiver_country: string; // 收货人国家
  receiver_province: string; // 收货人省份
  receiver_city: string; // 收货人城市
  receiver_address: string; // 收货人地址
  receiver_zip: string; // 收货人邮编
  receiver_remark: string; // 收货人备注
  paid_at?: string; // 支付时间
  delivered_at?: string; // 发货时间
  completed_at?: string; // 完成时间
  closed_at?: string; // 关闭时间
  created_at: string; // 创建时间
  updated_at: string; // 最后更新时间
}

// 订单响应类型
interface OrderRes extends Order {
  items: OrderItemRes[]; // 订单商品
}

// 收货人信息
interface OrderReceiver {
  receiver_name: string; // 收货人姓名
  receiver_phone: string; // 收货人电话
  receiver_email: string; // 收货人邮箱
  receiver_country: string; // 收货人国家
  receiver_province: string; // 收货人省份
  receiver_city: string; // 收货人城市
  receiver_address: string; // 收货人地址
  receiver_zip: string; // 收货人邮编
  receiver_remark: string; // 收货人备注
}

// 订单商品
interface OrderItem {
  id: number; // 商品ID
  order_id: string; // 订单ID
  product_item_id: string; // 商品ID
  quantity: number; // 商品数量
  price: number; // 商品单价
  total_amount: number; // 商品总价
  discount_amount: number; // 折扣金额
  discount: number; // 折扣
  discount_price: number; // 折扣价
  created_at: string; // 创建时间
  updated_at: string; // 最后更新时间
}

// 订单商品响应类型
interface OrderItemRes extends OrderItem {
  product_item: ProductItemRes; // 商品信息
}

// 创建订单请求体
interface ReqOrderCreate {
  user_id: string; // 用户ID
  receiver: OrderReceiver; // 收货人信息
  items: ReqOrderItemCreate[]; // 订单商品列表
  cart_uuids: string[]; // 购物车ID列表
}

// 创建订单商品请求体
interface ReqOrderItemCreate {
  product_item_id: string; // 商品ID
  quantity: number; // 商品数量
}

// 订单查询参数请求体
interface ReqOrderQueryParam extends Pagination {
  user_id?: string; // 用户ID，用于过滤
  status?: OrderStatus; // 订单状态，用于过滤
  order_no?: string; // 订单编号，用于过滤
}

// 假设的相关类型
// interface ProductItemRes {
//     // 根据你的实际定义来替换
// }

// 分页信息
interface Pagination {
  pageSize?: number; // 每页显示个数
  current?: number; // 当前页码
  start_time?: string; // 开始时间
  end_time?: string; // 结束时间
}

// 订单查询参数
interface OrderQueryParams extends BaseQueryParams {
  end_time?: string;
  order_no?: string;
  start_time?: string;
  status?: string;
  user_id?: string;
}
