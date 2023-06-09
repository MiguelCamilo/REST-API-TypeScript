// install the packages but
// with typescript we have ton install the types
import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import 'dotenv/config'

import router from './router'

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
}));
app.use(cookieParser())
app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
})

const MONGO_URL = process.env.MONGO_URL;
mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router())

