import request from '@/utils/request';
import {MarketTableListItem, TableListParams} from './data.d';

export async function queryMarket(params?: { pageSize?: number; current?: number; [p: string]: any } | undefined) {
  return request('/api/market', {
    params,
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
