import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './stocksSlice';
import { initializeApi } from '../api/api';

const store = configureStore({
  reducer: {
    stocks: stocksReducer
  }
});

initializeApi(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
