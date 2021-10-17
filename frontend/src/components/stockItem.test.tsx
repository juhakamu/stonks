import React from 'react';
import StockItem from './stockItem';
import { render, screen } from '../util/test-utils';
import { StockItemType } from '../store/stocksSlice';

test('StockItem displays correct data', () => {
  const stock: StockItemType = {
    name: 'TSLA',
    bid: 123,
    ask: 124,
    prevAsk: undefined
  };
  render(<StockItem stock={stock} />);
  expect(screen.getByText(/TSLA/i)).toBeInTheDocument();
  expect(screen.getByText(/bid: 123/i)).toBeInTheDocument();
  expect(screen.getByText(/ask: 124/i)).toBeInTheDocument();
});
