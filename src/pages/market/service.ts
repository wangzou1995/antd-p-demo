import request from '@/utils/request';
import {MarketTableListItem, TableListParams} from './data.d';
const BASE_URL = '/merchant/jsonreq.action'
export async function queryMarket(params?: { pageSize?: number; current?: number; [p: string]: any } | undefined) {
  return request(BASE_URL, {
    method: 'POST',
    data: {
      code: "getMarketAppList",
      entity: {
        ...params,
        page: {pageSize: params?.pageSize, pageIndex: params?.current},
        orderByArray: [{fieldName: "id", order: "DESC"}]
      }
    }
  });
}

export async function removeMarket(params: { key: number[] }) {
  return request('/api/market', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addMarket(params: MarketTableListItem) {
  return request('/api/market', {
    method: 'POST',
    data: {
      params,
      method: 'post',
    },
  });
}

export async function updateMarket(params: TableListParams) {
  return request('/api/market', {
    method: 'POST',
    data: {
      params,
      method: 'update',
    },
  });
}
