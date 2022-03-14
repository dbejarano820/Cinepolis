import * as express from "express";
import {itemrouter} from './itemrouter';
import {userrouter} from './userrouter'

class Routes {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use('/item', itemrouter);
        this.express.use('/user', userrouter);
    }
}

export default new Routes().express;