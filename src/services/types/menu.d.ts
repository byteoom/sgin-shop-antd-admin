export interface Menu {
  id: number; // ID 是菜单的主键
  uuid: string; // UUID 是菜单的唯一标识符
  name: string; // Name 是菜单的名称
  link: string; // Link 是菜单的链接
  parent_uuid: string; // ParentUUID 是父菜单的UUID
  icon: string; // Icon 是菜单的图标
  order: number; // Order 是菜单的排序
  is_show: boolean; // IsShow 是菜单是否显示
  type: number; // Type 是菜单的类型  1:目录 2、菜单、 3:按钮  4:链接
  created_at?: string; // 创建时间
  updated_at?: string; // 最后更新时间
}

// 用于表示关联关系的结构体
export interface MenuAPI {
  id: number; // ID 是关联关系的主键
  uuid: string; // UUID 是关联关系的唯一标识符
  menu_uuid: string; // MenuUUID 是菜单的UUID
  api_uuid: string; // APIUUID 是API的UUID
  created_at: string; // 创建时间
  updated_at: string; // 最后更新时间
}

// 用于创建 MenuAPI 的请求体
export interface ReqMenuAPICreate {
  menu_uuid: string; // MenuUUID 是菜单的UUID
  api_uuids: string[]; // APIUUIDs 是API的UUID数组
}

// 菜单列表查询参数
export interface MenuQueryParams extends BaseQueryParams {
  name: string; // Name 是菜单的名称
}

// 新增菜单权限
export interface ReqMenuCreate {
  menu_uuids: string[];
  permission_uuid: string;
}

// 菜单权限
export interface MenuApi {
  id: number;
  menu_uuid: string;
  permission_uuid: string;
  uuid: string;
}
