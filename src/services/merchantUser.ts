import request from '@/utils/request';
import {CurrentMerchantUser} from "@/models/merchantUser";
const BASE_URL = '/merchant/jsonreq.action'
export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request(BASE_URL, {method: 'POST', data: {code: 'getUserAllInfo'}});
}

export async function updateMerchantUserInfo(entity: CurrentMerchantUser): Promise<any> {
  return request(BASE_URL, {method : 'POST', data : {code : 'updateUserInfo', entity: entity}});
}
