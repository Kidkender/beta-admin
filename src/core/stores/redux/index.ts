import reducerPersist from '@configs/redux.config'
import __ENV__ from '@constant/env.const.ts'
import { apiRTKQuery } from '@core/stores/redux/api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { PERSIST, persistStore, REGISTER, REHYDRATE } from 'redux-persist'

export const store = configureStore({
  reducer: reducerPersist,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        // Bỏ qua kiểm tra tuần tự với các action liên quan đến redux-persist
        ignoredActions: [REHYDRATE, PERSIST, REGISTER],
      },
    }).concat(apiRTKQuery.middleware),
  devTools: !__ENV__.IS_PRODUCTION,
})

export const persistor = persistStore(store)

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, user: UsersState}
export type AppDispatch = typeof store.dispatch
