import { configureStore, type Reducer } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "./slices/authSlice"
import modalReducer from "./slices/modalSlice"

export const store = configureStore({
  reducer: {
    auth: persistReducer(
      {
        key: "auth",
        storage,
        whitelist: ["token", "isAuthenticated", "role"],
      },
      authReducer,
    ) as Reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
