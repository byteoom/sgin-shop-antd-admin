// 系统操作日志的基础信息
interface SysOpLog {
    id: number; // 主键ID
    request_id: string; // 请求ID
    user_uuid: string; // 用户UUID
    path: string; // 请求路径
    method: string; // 请求方法
    ip: string; // 请求IP
    status: number; // 状态
    code: number; // 状态码
    message: string; // 消息
    params: string; // 请求参数
    duration: number; // 请求耗时(毫秒)
    created_at: string; // 创建时间
  }
  
  // 系统操作日志响应类型
  interface SysOpLogRes extends SysOpLog {
    username: string; // 用户名
    module: string; // 模块
    name: string; // 操作名称
  }
  