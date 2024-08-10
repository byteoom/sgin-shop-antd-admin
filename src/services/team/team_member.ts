import { request } from '@umijs/max';

// 获取团队成员列表
export async function getTeamMembers(params) {
  return request('/api/v1/team_member/list', {
    method: 'POST',
    data: params,
  });
}

// 创建团队成员
export async function addTeamMember(data) {
  return request('/api/v1/team_member/create', {
    method: 'POST',
    data,
  });
}

// 删除团队成员
export async function deleteTeamMember(data) {
  return request('/api/v1/team_member/delete', {
    method: 'POST',
    data,
  });
}
