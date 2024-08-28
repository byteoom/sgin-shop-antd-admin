// 配置类型常量
enum ConfigCategory {
    Site = "site", // 站点配置
    Email = "email", // 邮件配置
  }
  
  // 站点配置名称常量
  enum ConfigNameSite {
    Url = "site_url", // 站点url
    Title = "site_title", // 站点标题
    SubTitle = "site_sub_title", // 站点副标题
    Description = "site_description", // 站点描述
    Keyword = "site_keyword", // 站点关键字
    CopyRight = "site_copy_right", // 站点版权信息
    RecordNo = "site_record_no", // 站点备案号
    RecordUrl = "site_record_url", // 站点备案链接
    Logo = "site_logo", // 站点logo
    Favicon = "site_favicon", // 站点favicon
    Language = "site_language", // 站点语言
  }
  
  // 邮件配置名称常量
  enum ConfigNameEmail {
    SmtpHost = "email_smtp_host", // SMTP 服务器
    SmtpPort = "email_smtp_port", // SMTP 端口
    SmtpUser = "email_smtp_user", // SMTP 发件人
    SmtpPass = "email_smtp_pass", // SMTP 密码
  }
  
  // 配置信息结构体
  interface Configuration {
    id: number; // ID
    category: string; // 配置分类
    name: string; // 配置名称
    value: string; // 配置值
    created_at: string; // 创建时间
    updated_at: string; // 更新时间
  }
  
  // 创建配置请求体
  interface ReqConfigCreate {
    category: string; // 配置分类
    name: string; // 配置名称
    value: string; // 配置值
  }
  
  // 配置查询参数请求体
  interface ReqConfigQueryParam {
    name?: string; // 配置名称
    category?: string; // 配置分类
    pagination: Pagination; // 分页信息
  }
  
  // 配置分类参数请求体
  interface ReqConfigCategoryParam {
    category: string; // 配置分类
  }
  
// 分页信息
interface Pagination {
    pageSize: number; // 每页显示个数
    current: number; // 当前页码
    start_time?: string; // 开始时间 (可选)
    end_time?: string; // 结束时间 (可选)
  }
  