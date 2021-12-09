import api from 'services'

const {getAllPayTypes,saveOrEditPayType,deletePayType,blockOrActivatePayType}=api
export default {
  namespace: 'payType',
  state: {
    payTypePage: [],
  },
  subscriptions: {},
  effects: {
    * getAllPayTypes({payload}, {call, put, select}) {
      const res = yield call(getAllPayTypes, payload)
      yield put({
        type: 'updateState',
        payload: {
          payTypePage: res.object,
        }
      })
    },
    * saveOrEditPayType({payload},{call, select, put}) {
      const res=yield call(saveOrEditPayType,payload)
      return res;
    },
    * deletePayType({payload},{call, select, put}){
      const res=yield call(deletePayType,payload)
      return res;
    },
    * blockOrActivatePayType({payload},{call, select, put}){
      const res=yield call(blockOrActivatePayType,payload)
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
