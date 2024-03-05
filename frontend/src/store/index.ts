import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from "redux-persist";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import { authReducer, billingReducer } from "./reducer";
import { encryptTransform } from "redux-persist-transform-encrypt";
const logger = createLogger({ collapsed: true });
const reducers = combineReducers({
  auth: authReducer,
  billing: billingReducer,
});

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform(
      (function (HydratedSubState, EndSubState, State, RawState) {
        return {
          secretKey: "my-super-secret-key",
          onError: function (error: any) {},
        };
      })()
    ),
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(logger),
});

const persistor = persistStore(store);

export { store, persistor };
