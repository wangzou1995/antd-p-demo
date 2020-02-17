import request from '@/utils/request';
import {CurrentMerchantUser, ResetPassword} from "@/models/merchantUser";
const BASE_URL = '/merchant/jsonreq.action'

export async function queryCurrent(): Promise<any> {
  return request(BASE_URL, {method: 'POST', data: {code: 'getUserAllInfo'}});
}

export async function updateMerchantUserInfo(entity: CurrentMerchantUser): Promise<any> {
  return request(BASE_URL, {method : 'POST', data : {code : 'updateUserInfo', entity: entity}});
}

export async function resetPassword(entity : ResetPassword) : Promise<any> {
  return request(BASE_URL, {method : 'POST', data : {code : 'changePassWord', entity: entity}});
}
