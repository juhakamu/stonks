import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StockItemType = {
  name: string,
  ask: number | undefined,
  prevAsk: number | undefined,
  bid: number | undefined,
}

export type StockList = StockItemType[];

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
