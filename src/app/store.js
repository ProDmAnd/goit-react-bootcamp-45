import {
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST, persistReducer, persistStore, PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { fetchNewsByQuery } from './news/operations';
import rootReducer from './rootReducer';
// import { fetchTodosThunk } from './todos/operations';

const userPersistConfig = {
  key: 'token',
  storage,
  whitelist: ['token'],
};

const persistedRootReducer = combineReducers({
  ...rootReducer,
  user: persistReducer(userPersistConfig, rootReducer.user),
});

const customLogger = store => next => action => {
  // console.log('prevState', store.getState());
  // console.log('action', action);
  const nextResult = next(action);
  // console.log('nextState', store.getState());
  return nextResult;
};

const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddelware =>
    getDefaultMiddelware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([customLogger]),
  devTools: process.env.NODE_ENV !== 'production',
});

// const initApp = createAsyncThunk('initApp', async (_, thunkApi) => {
//   thunkApi.dispatch(fetchTodosThunk());
//   thunkApi.dispatch(fetchNewsByQuery());
// });

export default store;

// store.dispatch(initApp());

export const persistor = persistStore(store);
