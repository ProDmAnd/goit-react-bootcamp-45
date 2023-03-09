import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['isLoggedIn'],
};

const persistedRootReducer = combineReducers({
  ...rootReducer,
  user: persistReducer(userPersistConfig, rootReducer.user),
});

const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddelware =>
    getDefaultMiddelware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export const persistor = persistStore(store);