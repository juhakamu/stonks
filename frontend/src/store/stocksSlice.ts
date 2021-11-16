import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StockType } from '../../../backend/src/services/stockCache';

export type StockList = StockType[];

export type StocksStateType = {
  stocks: StockList
}

const initialState: StocksStateType = {
  stocks: []
};

export const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    refreshStocks: (state, action: PayloadAction<StockList>) => {
      state.stocks = action.payload;
    }
  }
});

export const { refreshStocks } = stocksSlice.actions;
export default stocksSlice.reducer;
