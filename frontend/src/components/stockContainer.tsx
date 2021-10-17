import React from 'react';
import { StocksStateType } from '../store/stocksSlice';
import StockItem from './stockItem';

export type StockContainerProps = {
  stockList: StocksStateType['stocks']
}

const StockContainer = ({ stockList }: StockContainerProps) => {
  return (
    <div>
      {stockList.map(stock => {
        return <StockItem key={stock.name} stock={stock} />;
      })}
    </div>
  );
};

export default StockContainer;
