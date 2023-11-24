import request from '@/utils/request';
import { TableListQueryParams, TableListItem } from './data.d';

export async function queryArticleList(params?: TableListQueryParams): Promise<any> {
  return request({
    url: '/article',
    method: 'get',
    params,
  });
}

export async function createArticle(params: Omit<TableListItem, 'id'>): Promise<any> {
  return request({
    url: '/article',
    method: 'POST',
    data: params,
  });
}

export async function queryArticleDetail(params: {id: string}): Promise<any> {
  return request({
    url: '/article/detail',
    method: 'get',
    params
  });
}

export async function removeData(id: number): Promise<any> {
  return request({
    url: `/article`,
    method: 'delete',
    params: { id }
  });
}

export async function updateData(params: Omit<TableListItem, 'id'>): Promise<any> {
  return request({
    url: `/article`,
    method: 'PUT',
    data: params,
  });
}


export async function detailData(id: number): Promise<any> {
  return request({ url: `/pages/list/${id}` });
}
