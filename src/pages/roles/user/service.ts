import request from '@/utils/request';
import { TableListQueryParams, TableListItem } from './data.d';

export async function queryUserList(params?: TableListQueryParams): Promise<any> {
  return request({
    url: '/user',
    method: 'get',
    params,
  });
}

export async function removeData(id: number): Promise<any> {
  return request({
    url: `/user`,
    method: 'delete',
    params: { id }
  });
}

export async function updateData(id: number, params: Omit<TableListItem, 'id'>): Promise<any> {
  return request({
    url: `/pages/list/${id}`,
    method: 'PUT',
    data: params,
  });
}
