import { Effect } from 'dva';
import { Reducer } from 'redux';
import { notification } from 'antd';
import { queryCurrent, query as queryUsers, updateMerchantUserInfo } from '@/services/merchantUser';

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

export interface MerchantUserModelState {
  currentUser?: CurrentMerchantUser;
}

export interface MerchantUserModelType {
  namespace: 'merchantUser';
  state: MerchantUserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
    updateMerchantUserInfo: Effect
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
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
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
        })
        yield put({
          type: 'updateCurrentUser',
          payload: payload,
        });
      }
    }
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload.entity || {},
      };
    },
    updateCurrentUser (state,action){
      return {
        ...state,
        currentUser:  action.payload.entity || {},
      }
    }
  },
};

export default MerchantUserModel;
