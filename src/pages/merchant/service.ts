import request from '@/utils/request';
import {TableListItem, TableListParams} from './data.d';
const BASE_URL = '/merchant/jsonreq.action'
export async function queryTenant(params?: { pageSize?: number; current?: number; [p: string]: any } | undefined) {
  return request(BASE_URL, {
    method: 'POST',
    data: {
      code: "getTenantListByCreator",
      ...params,
    }
  });
}
export async function removeTenant(params: { key: number[] }) {
  return request('/merchant/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addTenant(params: TableListItem) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      params,
      method: 'post',
    },
  });
}

export async function updateTenant(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      params,
      method: 'update',
    },
  });
}
