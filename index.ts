import 'dotenv/config';

import * as http from 'http';
import express from 'express';

import api from '@src/api';

async function main() {
    const app = express();
    const httpServer = http.createServer(app);

    await api.start();

    api.applyMiddleware({ app });
    httpServer.listen(process.env.PORT, () => {
        console.log(`API is running on http://${process.env.HOST}:${process.env.PORT}/graphql`);
    });
}

main();

// #TODO: unit testing via jest
