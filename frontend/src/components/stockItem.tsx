import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronCircleUp, faMinus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { StockItemType } from '../store/stocksSlice';
import { removeStock } from '../api/api';

type StockItemProps = {
  stock: StockItemType
}

const StockItem = ({ stock }: StockItemProps) => {
  const [mouseOver, setMouseOver] = useState(false);

  let directionIcon = faMinus;
  if (stock.prevAsk && stock.ask) {
    if (stock.prevAsk < stock.ask) {
      directionIcon = faChevronCircleUp;
    } else if (stock.prevAsk > stock.ask) {
      directionIcon = faChevronCircleDown;
    }
  }

  const handleRemoveStock = () => {
    console.log(`remove stock ${stock.name}`);
    removeStock(stock.name);
  };

  return (
    <div className="stockItem" onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
      {`${stock.name}, bid: ${stock.bid}, ask: ${stock.ask} `}
      {stock.prevAsk && <FontAwesomeIcon icon={directionIcon} />}
      {mouseOver && <FontAwesomeIcon icon={faTimesCircle} onClick={handleRemoveStock} />}
    </div>
  );
};

export default StockItem;
