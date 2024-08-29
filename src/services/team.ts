import { request } from '@umijs/max';
import {
  BaseListResult,
  BaseResult,
  O_IDS,
  Team,
  TeamMember,
  TeamQueryParams,
} from './types';

// 获取团队列表
async function getTeams(
  params: TeamQueryParams,
): Promise<BaseListResult<Team>> {
  return request('/api/v1/team/list', {
    method: 'POST',
    data: params,
  });
}

// 获取团队信息
async function getTeamInfo(params: O_IDS): Promise<BaseResult<Team>> {
  return request('/api/v1/team/info', {
    method: 'POST',
    data: params,
  });
}

// 创建团队
async function addTeam(data: Team): Promise<BaseResult> {
  return request('/api/v1/team/create', {
    method: 'POST',
    data,
  });
}

// 更新团队
async function updateTeam(data: Team): Promise<BaseResult> {
  return request('/api/v1/team/update', {
    method: 'POST',
    data,
  });
}

// 删除团队
async function deleteTeam(data: O_IDS): Promise<BaseResult> {
  return request('/api/v1/team/delete', {
    method: 'POST',
    data,
  });
}

// 获取团队成员列表
async function getTeamMembers(
  params: TeamQueryParams,
): Promise<BaseListResult<TeamMember>> {
  return request('/api/v1/team_member/list', {
    method: 'POST',
    data: params,
  });
}

// 创建团队成员
async function addTeamMember(data: TeamMember): Promise<BaseResult> {
  return request('/api/v1/team_member/create', {
    method: 'POST',
    data,
  });
}

// 删除团队成员
async function deleteTeamMember(data: O_IDS): Promise<BaseResult> {
  return request('/api/v1/team_member/delete', {
    method: 'POST',
    data,
  });
}

export const teamService = {
  getTeams,
  getTeamInfo,
  addTeam,
  updateTeam,
  deleteTeam,
  getTeamMembers,
  addTeamMember,
  deleteTeamMember,
};
