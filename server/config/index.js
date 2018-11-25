import DotENV from 'dotenv';

DotENV.config();

const env = process.env.NODE_ENV;
const port = process.env.PORT;

module.exports = {
    env: env,
    port: port,
};