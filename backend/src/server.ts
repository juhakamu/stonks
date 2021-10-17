import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { addUser, removeUser } from './handlers/userHandler';
import { addStock, removeStock } from './handlers/stockHandler';

const logger = require('./util/logger')(module);

const app = express();
const port = 3001;

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);

const corsOptions = {
  origin: isDevelopmentEnv ? true : process.env.APP_URI, // for dev: Access-Control-Allow-Origin from req.header('Origin')
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  maxAge: 600,
  allowedHeaders: 'Content-Type,Authorization,x-requested-with'
};

app.use(cors(corsOptions));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.xssFilter());
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  logger.info(`socket.io ${socket.id} connect`);
  addUser(socket);

  socket.on('disconnect', () => {
    logger.info(`socket.io ${socket.id} disconnect`);
    removeUser(socket.id);
  });

  socket.on('addStock', data => {
    logger.info(`socket.io ${socket.id} addStock: ${data}`);
    addStock(socket, data);
  });

  socket.on('removeStock', data => {
    logger.info(`socket.io ${socket.id} removeStock: ${data}`);
    removeStock(socket, data);
  });
});

httpServer.listen(port);
httpServer.on('listening', () => {
  logger.info(`Server listening on port ${port}`);
});
