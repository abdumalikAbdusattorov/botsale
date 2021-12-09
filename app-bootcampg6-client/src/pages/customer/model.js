import api from 'services'

const {saveOrEditCustomer, deleteCustomer, blockOrActivateCustomer, getByPageableCustomer} = api
export default {
  namespace: 'customer',
  state: {
    customerPage: [],
    customerTotalElements: 0
  },

  subscriptions: {},

  effects: {
    * getByPageableCustomer({payload}, {call, put, select}) {
      const res = yield call(getByPageableCustomer, payload);
      yield put({
        type: 'updateState',
        payload: {
          customerPage: res.object.content,
          customerTotalElements: res.totalElements
        }
      })
    },
    * saveOrEditCustomer({payload}, {call, select, put}) {
      const res = yield call(saveOrEditCustomer, payload)
      return res;
    },
    * deleteCustomer({payload}, {call, select, put}) {
      const res = yield call(deleteCustomer, payload)
      return res;
    },
    * blockOrActivateCustomer({payload}, {call, select, put}) {
      const res = yield  call(blockOrActivateCustomer, payload)
      return res;
    }

  },
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    }
  }
}
