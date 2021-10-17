import { Socket } from 'socket.io';

const logger = require('../util/logger')(module);

export type User = {
  socket: Socket,
  stocks: string[]
}

const users = new Map<string, User>();

export const getUser = (id: string) => {
  logger.debug(`getUser ${id}`);
  return users.get(id);
};

export const getUsers = () => {
  logger.debug('getUsers');
  return Array.from(users.values());
};

export const addUser = (socket: Socket) => {
  logger.debug(`addUser ${socket.id}`);
  const user: User = {
    socket,
    stocks: []
  };
  users.set(socket.id, user);
};

export const removeUser = (id: string) => {
  logger.debug(`removeUser ${id}`);
  users.delete(id);
};
