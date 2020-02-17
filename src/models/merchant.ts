import { Effect } from 'dva';
import { Reducer } from 'redux';
import {queryTenant} from "@/pages/merchant/service";

export interface Merchant{
  id?: number;
  tenantcode?: string;
  tenantname?: string;
  samplename?: string;
  signkey?: string;
  gatewayurl?: string;
}

export interface MerchantModelState {
  merchant?: Array<Merchant>;
}

export interface MerchantModelType {
  namespace: 'merchant';
  state: MerchantModelState;
  effects: {
    queryMerchant: Effect;
  };
  reducers: {
    saveMerchant: Reducer<MerchantModelState>;
  };
}

const MerchantModel: MerchantModelType = {
  namespace: 'merchant',

  state: {
    merchant: [],
  },

  effects: {
    *queryMerchant({ payload }, { call, put }) {
      const response = yield call(queryTenant(payload));
      yield put({
        type: 'saveMerchant',
        payload: response,
      });
    },
  },

  reducers: {
    saveMerchant(state, action) {
      return {
        ...state,
        merchant: action.payload.data || [],
      };
    },
  }
};

export default MerchantModel;
