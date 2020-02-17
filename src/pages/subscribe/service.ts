import request from '@/utils/request';
import {SubScribeTableListItem, TableListParams} from './data.d';
const BASE_URL =  '/merchant/jsonreq.action'
export async function querySubscribe(params?: { pageSize?: number; current?: number; [p: string]: any } | undefined) {
  return request(BASE_URL, {
    method: 'POST',
    data: {
      code: 'getSubscribeAppList',
      entity: {
        ...params,
        page: {pageSize: params?.pageSize, pageIndex: params?.current},
        orderByArray: [{fieldName: "id", order: "DESC"}]
      }
    }
  });
}

export async function removeSubscribe(params: { key: number[] }) {
  return request('/api/subscribe', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addSubscribe(params: SubScribeTableListItem) {
  return request('/api/subscribe', {
    method: 'POST',
    data: {
      params,
      method: 'post',
    },
  });
}

export async function updateSubscribe(params: TableListParams) {
  return request('/api/subscribe', {
    method: 'POST',
    data: {
      params,
      method: 'update',
    },
  });
}
