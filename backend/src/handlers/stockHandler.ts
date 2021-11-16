import { Socket } from 'socket.io';
import { getUser, getUsers, User } from './userHandler';
import * as stockCache from '../services/stockCache';
import { getStockInfo } from '../services/rapidApi';

const logger = require('../util/logger')(module);

export const addStock = async (socket: Socket, stockId: string) => {
  const socketId = socket.id;
  logger.info(`addStock: userId ${socketId}, stockId ${stockId}`);
  const user = getUser(socketId);
  if (!user) {
    logger.error(`User ${socket.id} not found`);
    return;
  }
  if (user.stocks.find(stock => stock === stockId)) {
    logger.error(`User ${socket.id} is already following stock ${stockId}`);
    return;
  }
  const stockInfo = stockCache.get(stockId)?.[0];
  if (!stockInfo) {
    const newStockInfo = await getStockInfo([stockId]);
    if (newStockInfo.length === 0) {
      logger.error(`Stock ${stockId} not found`);
      return;
    }
    stockCache.set(newStockInfo[0]);
  }
  user.stocks.push(stockId);
  updateStockForUser(user);
};

export const removeStock = async (socket: Socket, stockId: string) => {
  logger.info(`removeStock: userId ${socket.id}, stockId ${stockId}`);
  const socketId = socket.id;
  const user = getUser(socketId);
  if (!user) {
    logger.error(`User ${socket.id} not found`);
    return;
  }
  user.stocks = user.stocks.filter(stock => stock !== stockId);
  updateStockForUser(user);
};

const updateStockForUser = (user: User) => {
  const update: stockCache.StockType[] = [];
  user.stocks.forEach(stock => {
    const stockItem = stockCache.get(stock);
    if (stockItem) {
      update.push(stockItem[0]);
    }
  });
  user.socket.emit('update', update);
};

const updateStocks = async () => {
  logger.info('updateStocks');
  const users = getUsers();
  const stocks: string[] = [];
  users.forEach(user => {
    stocks.push(...user.stocks);
  });
  const stockArray = Array.from(new Set(stocks));
  logger.info(`Stocks that require updating: ${stockArray}`);
  while (stockArray.length > 0) {
    const spliced = stockArray.splice(0, 10);
    const updatedStocks = await getStockInfo(spliced);
    updatedStocks.forEach(element => {
      stockCache.set(element);
    });
  }

  users.forEach(user => updateStockForUser(user));
};

setInterval(updateStocks, 1000 * 60 * 5);
