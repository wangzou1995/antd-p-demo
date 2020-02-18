import { Reducer } from 'redux';
import { Effect } from 'dva';
import { stringify } from 'querystring';
import router from 'umi/router';

import { fakeAccountLogin, getFakeCaptcha, logout } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
// import {setToken} from "@/utils/token";
import {notification} from "antd";

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
  token?: string
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
    token: undefined
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      console.log(response)
      if (response.result) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        // Login successfully
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params as { redirect: string };
          console.log(redirect)
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
              console.log('1',redirect)
              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = '/';
              return;
            }
          }
          console.log(redirect || '/welcome')
          router.replace(redirect || '/welcome');
      } else {
        notification.error(
          {
            message: response.message
          }
        )
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_c,{call}) {
      const { redirect } = getPageQuery();
      yield call(logout)
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        // 清楚token
        sessionStorage.removeItem('yw_token')
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority('admin');
      // setToken(payload.entity.access_token)
      sessionStorage.setItem('yw_token',payload.entity.access_token)
      return {
        ...state,
        status: payload.result,
        // 固定用户
        type: 'account',
        token: payload.entity.access_token
      };
    },
  },
};

export default Model;
