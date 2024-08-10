import { request } from '@umijs/max';

// 获取团队列表
export async function getTeams(params) {
  return request('/api/v1/team/list', {
    method: 'POST',
    data: params,
  });
}

// 获取团队信息
export async function getTeamInfo(params) {
  return request('/api/v1/team/info', {
    method: 'POST',
    data: params,
  });
}

// 创建团队
export async function addTeam(data) {
  return request('/api/v1/team/create', {
    method: 'POST',
    data,
  });
}

// 更新团队
export async function updateTeam(data) {
  return request('/api/v1/team/update', {
    method: 'POST',
    data,
  });
}

// 删除团队
export async function deleteTeam(data) {
  return request('/api/v1/team/delete', {
    method: 'POST',
    data,
  });
}
