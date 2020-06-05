import express from 'express';
import bodyParser from 'body-parser';
import connect from './db';

import * as categoria from './categoria.controller'

connect('mongodb://localhost:27017/categorias');

const server = express();
server.use(
    bodyParser.json()
);
server.use(categoria.router);

export default server;
