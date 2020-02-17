import { Effect } from 'dva';
import { Reducer } from 'redux';
import { notification } from 'antd';
import {queryCurrent, updateMerchantUserInfo, resetPassword} from '@/services/merchantUser';

export interface CurrentMerchantUser {
  loginname?: string;
  nickname?: string;
  mobile?: string;
  email?: string;
  qq?: string;
  wechat?: string;
  mobileverify?: boolean;
  emailverify? :boolean;
}
export interface ResetPassword {
  password?: string;
  password1? : string;
  password2? : string;
}
export interface MerchantUserModelState {
  currentUser?: CurrentMerchantUser;
}

export interface MerchantUserModelType {
  namespace: 'merchantUser';
  state: MerchantUserModelState;
  effects: {
    fetchCurrent: Effect;
    updateMerchantUserInfo: Effect;
    updatePassword: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<MerchantUserModelState>;
    updateCurrentUser: Reducer<MerchantUserModelState>;
  };
}

const MerchantUserModel: MerchantUserModelType = {
  namespace: 'merchantUser',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *updateMerchantUserInfo ({ payload }, { call, put }) {
      const response = yield call(updateMerchantUserInfo,payload.entity);
      if (response.result) {
        notification.success({
          message: '更新成功！'
        });
        yield put({
          type: 'updateCurrentUser',
          payload: payload,
        });
      }
    },
    *updatePassword({ payload }, {call}){
      const response = yield call(resetPassword, payload.entity);
      if (response.result) {
        notification.success({
          message: '重置成功！'
        })
      } else {
        notification.warn({
          message: response.message
        })
      }
    }
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload && action.payload.entity || {},
      };
    },
    updateCurrentUser (state,action){
      return {
        ...state,
        currentUser:  action.payload && action.payload.entity || {},
      }
    }
  },
};

export default MerchantUserModel;
