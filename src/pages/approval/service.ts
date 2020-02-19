import request from '@/utils/request';

const BASE_URL = '/merchant/jsonreq.action'
export async function queryOrder(params?: { pageSize?: number; current?: number; [p: string]: any } | undefined) {
  return request(BASE_URL, {
    method: 'POST',
    data: {
      code: "getAppOrderReviewList",
      entity: {
        ...params,
        page: {pageSize: params?.pageSize, pageIndex: params?.current},
        orderByArray: [{fieldName: "id", order: "DESC"}]
      }
    }
  });
}
