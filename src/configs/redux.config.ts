import __REDUX__ from '@constant/redux.const.ts'
import apiReducer from '@core/stores/redux/api'
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducerPersist = persistReducer(
  {
    storage,
    key: __REDUX__.REDUCER_PATH.ROOT,
    whitelist: [__REDUX__.REDUCER_PATH.AUTH], // chỉ lưu trữ một số reducer nhất định
    blacklist: [__REDUX__.REDUCER_PATH.API],
  },
  combineReducers({
    // RTK Query
    [__REDUX__.REDUCER_PATH.API]: apiReducer,

    // Store Reducer
    // filter: filterReducer,
  }),
)
export default reducerPersist
