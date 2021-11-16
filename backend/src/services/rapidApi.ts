import axios from 'axios';
import { StockType } from './stockCache';

const logger = require('../util/logger')(module);

const url = 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote';
const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY || '';

type QuoteResponse = {
  quoteResponse: {
    result: {
      symbol: string
      bid: number,
      ask: number,
    }[]
  }
}

export const getStockInfo = async (stockList: Array<string>) => {
  logger.info(`getStockInfo: ${stockList.join(',')}`);
  const stocks: Array<StockType> = [];
  const config = {
    params: { symbols: stockList.join(',') },
    headers: {
      'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
      'x-rapidapi-key': X_RAPIDAPI_KEY
    }
  };
  try {
    const response = await axios.get<QuoteResponse>(url, config);
    logger.debug(JSON.stringify(response.data));
    response.data.quoteResponse.result.forEach(result => {
      const item: StockType = {
        name: result.symbol,
        bid: result.bid,
        ask: result.ask,
        prevAsk: undefined
      };
      stocks.push(item);
    });
    return stocks;
  } catch (error) {
    logger.error(error);
    return [];
  }
};
