import { BaseQueryParams } from './common';
// 团队的基础信息
export interface Team {
  id: number; // 团队ID
  uuid: string; // 团队的唯一标识符
  owner_uuid: string; // 拥有者UUID
  name: string; // 团队名称，系统中唯一
  desc: string; // 团队描述
  created_at: string; // 团队创建时间
  updated_at: string; // 团队最后更新时间
  is_active: boolean; // 团队是否活跃
  creater: string; // 团队的创建者UUID
}

// 角色的基础信息
export interface Role {
  id: number; // 角色ID
  uuid: string; // 角色的唯一标识
  team_uuid: string; // 团队的UUID
  name: string; // 角色名称，系统中唯一
  desc: string; // 角色描述
  created_at: string; // 角色创建时间
  updated_at: string; // 角色最后更新时间
  is_active: boolean; // 角色是否活跃
}

// 团队成员的基础信息
export interface TeamMember {
  id: number; // 团队成员ID
  uuid: string; // 团队成员的唯一标识符
  team_uuid: string; // 团队的UUID
  user_uuid: string; // 用户的UUID
  role: string; // 成员在团队中的角色
  created_at: string; // 团队成员加入的时间
  updated_at: string; // 团队成员信息最后更新时间
}
// 团队列表查询参数
export interface TeamQueryParams extends BaseQueryParams {
  name?: string; // 团队名称
}
