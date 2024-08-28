// 资源类型常量
enum ResourceType {
    Folder = "folder", // 文件夹
    File = "file", // 文件
  }
  
  // 资源的基础信息
  interface Resource {
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
  
  // 创建文件夹请求体
  interface ReqResourceCreateFolder {
    name: string; // 文件夹名称
    description: string; // 文件夹描述
    path: string; // 文件夹路径
  }
  
  // 移动资源请求体
  interface ReqResourceMove {
    uuid_list: string[]; // 资源UUID列表
    parent_uuid: string; // 父级资源UUID
  }
  
  // 资源查询参数请求体
  interface ReqResourceQueryParam extends Pagination {
    path?: string; // 资源路径
    name?: string; // 资源名称
    parent_uuid?: string; // 父级资源UUID
    mime_type?: string; // 文件类型
  }
  
  // 资源响应类型
  interface ResourceRes extends Resource {
    children: ResourceRes[]; // 子资源
  }
  
  // 删除资源请求体
  interface ReqResourceDeleteParam {
    uuid: string; // 资源UUID
  }
  
  // 分页信息
  interface Pagination {
    pageSize?: number; // 每页显示个数
    current?: number; // 当前页码
    start_time?: string; // 开始时间
    end_time?: string; // 结束时间
  }
  