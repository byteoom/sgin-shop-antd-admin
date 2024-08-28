// 定义权限位
enum PermissionBit {
    Create = 1 << 3, // 创建权限: 1000 (8)
    Read = 1 << 2, // 查询权限: 100 (4)
    Edit = 1 << 1, // 编辑权限: 010 (2)
    Delete = 1 << 0, // 删除权限: 001 (1)
}

// 权限的基础信息
interface Permission {
    id: number; // ID 是权限的主键
    uuid: string; // UUID 是权限的唯一标识符
    name: string; // Name 是权限的名称
    bit: number; // Bit 是权限的位
    parent_uuid: string; // ParentUuid 是权限的父级 UUID
    created_at: string; // 创建时间
    updated_at: string; // 最后更新时间
}

// 权限菜单
interface PermissionMenu {
    id: number; // ID 是权限菜单的主键
    uuid: string; // UUID 是权限菜单的唯一标识符
    permission_uuid: string; // PermissionUuid 是权限的 UUID
    menu_uuid: string; // MenuUuid 是菜单的 UUID
    created_at?: string; // 创建时间 (省略不返回)
    updated_at?: string; // 最后更新时间 (省略不返回)
}

// 创建权限菜单请求体
interface ReqPermissionMenuCreate {
    permission_uuid: string; // PermissionUuid 是权限的 UUID
    menu_uuids: string[]; // MenuUuids 是菜单的 UUID 列表
}

// 用户权限关联
interface UserPermission {
    id: number; // ID 是用户权限关联的主键
    uuid: string; // UUID 是用户权限关联的唯一标识符
    user_uuid: string; // UserUuid 是用户的 UUID
    permission_uuid: string; // PermissionUuid 是权限的 UUID
    created_at: string; // 创建时间
    updated_at: string; // 最后更新时间
}

// 创建用户权限请求体
interface ReqPermissionUserCreate {
    user_uuid: string; // UserUuid 是用户的 UUID
    permission_uuids: string[]; // PermissionUuids 是权限的 UUID 列表
}
