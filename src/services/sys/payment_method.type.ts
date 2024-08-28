// 支付方式信息
interface PaymentMethod {
    id: number; // ID
    uuid: string; // 支付方式UUID
    name: string; // 支付方式名称
    code: string; // 支付方式code
    description: string; // 支付方式描述
    icon: string; // 支付方式图标
    url: string; // 支付方式URL
    status: number; // 支付方式状态 1: 启用 2: 禁用
    config: string; // 支付方式配置
  }
  
  // 支付方式查询参数请求体
  interface ReqPaymentMethodQueryParam extends Pagination {
    name?: string; // 支付方式名称，用于过滤
    code?: string; // 支付方式code，用于过滤
    status?: number; // 支付方式状态，用于过滤
  }
  
  // 支付方式信息请求参数
  interface ReqPaymentMethodInfoParam {
    uuid?: string; // 支付方式UUID
    code?: string; // 支付方式code
  }
  
  // 支付方式响应类型
  interface PaymentMethodRes extends PaymentMethod {
    is_config: boolean; // 是否已经配置
  }
  
  // PayPal 客户端ID请求参数
  interface ReqPaypalClientIdParam {
    env: string; // 环境
  }
  
  // 支付订单创建请求参数
  interface ReqPaymentOrderCreateParam {
    order_id: string; // 订单ID
  }
  
  // PayPal 订单创建请求参数
  interface ReqPaypalOrderCreateParam {
    productName: string; // 名称
    amount: number; // 金额
    currency?: string; // 货币
  }
  
  // 分页信息
  interface Pagination {
    pageSize?: number; // 每页显示个数
    current?: number; // 当前页码
    start_time?: string; // 开始时间
    end_time?: string; // 结束时间
  }
  