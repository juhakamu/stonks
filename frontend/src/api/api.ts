import { EnhancedStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { refreshStocks } from '../store/stocksSlice';

let store: EnhancedStore;

const socket = io('http://localhost:3001');

export const initializeApi = (storez: EnhancedStore) => {
  store = storez;
};

socket.on('update', data => {
  store.dispatch(refreshStocks(data));
});

export const addStock = (stockId: string) => {
  socket.emit('addStock', stockId);
};

export const removeStock = (stockId: string) => {
  socket.emit('removeStock', stockId);
};
