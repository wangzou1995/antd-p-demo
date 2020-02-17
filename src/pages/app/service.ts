import request from '@/utils/request';
import {AppTableListItem, TableListParams} from './data.d';
const BASE_URL =  '/merchant/jsonreq.action'
export async function queryApp(params?: { pageSize?: number; current?: number; [p: string]: any } | undefined) {
  return request(BASE_URL, {
    method: 'POST',
    data: {
      code: 'getAppListPage',
      entity: {
        ...params,
        page: {pageSize: params?.pageSize, pageIndex: params?.current},
        orderByArray: [{fieldName: "id", order: "DESC"}]
      }
    }
  });
}

export async function removeApp(params: { key: number[] }) {
  return request('/api/app', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addApp(params: AppTableListItem) {
  return request('/api/app', {
    method: 'POST',
    data: {
      params,
      method: 'post',
    },
  });
}

export async function updateApp(params: TableListParams) {
  return request('/api/app', {
    method: 'POST',
    data: {
      params,
      method: 'update',
    },
  });
}
