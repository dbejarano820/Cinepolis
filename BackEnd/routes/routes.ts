import * as express from "express";
import {movierouter} from './movierouter';
import {foodrouter} from './foodrouter';
import { userrouter } from "./userrouter";

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
        this.express.use('/movies', movierouter);
        this.express.use('/food', foodrouter);
        //this.express.use('/user', userrouter);
        this.express.use('/users', userrouter);
    }
}

export default new Routes().express;