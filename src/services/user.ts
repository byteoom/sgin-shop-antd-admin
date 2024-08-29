import { request } from '@umijs/max';
import { O_IDS, User } from './types';

async function getUserInfo(uuid: string) {
  return request('/api/v1/user/info', {
    method: 'POST',
    data: { uuid: uuid },
  });
}

async function getMyUserInfo() {
  return request('/api/v1/user/myinfo', {
    method: 'GET',
  });
}

async function login(data: { username: string; password: string }) {
  return request('/api/v1/login', {
    method: 'POST',
    data,
  });
}

async function getUsers(data: any) {
  return request('/api/v1/user/list', {
    method: 'POST',
    data,
  });
}

async function addUser(data: User) {
  return request('/api/v1/user/create', {
    method: 'POST',
    data,
  });
}

async function updateUser(data: User) {
  return request('/api/v1/user/update', {
    method: 'POST',
    data,
  });
}
async function deleteUser(data: O_IDS) {
  return request('/api/v1/user/delete', {
    method: 'POST',
    data,
  });
}

// 更新头像
export async function updateAvatar(data: FormData) {
  return await request('/api/v1/user/avatar', {
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function getUserOptions() {
  return await request('/api/v1/user/all', {
    method: 'POST',
  });
}

export const userService = {
  getUserInfo,
  getMyUserInfo,
  login,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  updateAvatar,
  getUserOptions,
}