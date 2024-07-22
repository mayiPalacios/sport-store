// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "@/features/auth/authSlice";
import searchReducer from "@/features/search/searchSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    search: searchReducer,
  },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
