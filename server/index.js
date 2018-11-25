import Express from 'express';
import BodyParser from 'body-parser';
import Cors from 'cors';
import Path from 'path';
import {Api, Web} from './routes/index';

const app = Express();

app.use(Cors())
    .use(BodyParser.json())
    .use(BodyParser.urlencoded({extended: true}))
    .use(Express.static(Path.resolve(__dirname, '..', 'public'), {maxAge: 31557600000}))
    .use('/', Web)
    .use('api', Api)
    .disable('x-powered-by');

module.exports = app;
