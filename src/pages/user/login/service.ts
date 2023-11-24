import request from '@/utils/request';
import { LoginParamsType } from './data.d';

export async function accountLogin(params: LoginParamsType): Promise<any> {
  return request({
    url: '/user/login',
    method: 'post',
    data: params,
  });
}

export async function accountLogout(params: LoginParamsType): Promise<any> {
  return request({
    url: '/user/logout',
    method: 'put',
    data: params,
  });
}
