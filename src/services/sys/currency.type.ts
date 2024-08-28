// 货币状态常量
enum CurrencyStatus {
    Enabled = 1, // 启用
    Disabled = 2, // 禁用
  }
  
  // 货币信息结构体
  interface Currency {
    id: number; // ID
    uuid: string; // 货币UUID
    name: string; // 货币名称
    code: string; // 货币代码
    symbol: string; // 货币符号
    status: CurrencyStatus; // 状态 1:启用 2:禁用
  }
  
  // 创建货币请求体
  interface ReqCurrencyCreate {
    name: string; // 货币名称
    code: string; // 货币代码
    symbol: string; // 货币符号
  }
  
  // 货币查询参数请求体
  interface ReqCurrencyQueryParam {
    name?: string; // 货币名称
    pageSize?: number; // 每页显示个数
    current?: number; // 当前页码
    start_time?: string; // 开始时间
    end_time?: string; // 结束时间
  }
  