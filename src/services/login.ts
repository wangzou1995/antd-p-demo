import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  grant_type:string,
  response_type:string,
  client_secret:string,
  client_id:string,
}
export async function fakeAccountLogin(params: LoginParamsType) {
  // oauth clientdetails
  params.client_id = 'configsystem'
  params.client_secret = 'DCBEA765544BAE'
  params.grant_type = 'password'
  params.response_type = 'token'
  return request('/merchant/loginInterface', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function logout() {
  return request('/merchant/logout');
}
