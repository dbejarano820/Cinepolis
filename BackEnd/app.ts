import * as express from "express";
import Routes from './routes/routes';
//import * as database from "./db"
import path = require("path");
const cors = require('cors');
const session = require("express-session")

class App {

    public app: express.Application;
    public db: any;

    constructor() {
        //this.db = database.default;
        this.app = express();
        this.middleware();
        this.routes();
    }


    // Configure Express middleware.
    private middleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        // this.app.use(session({
        //     secret: "Secret Key",
        //     store: new MongoDBStore({uri: 'mongodb://172.30.232.105:27017/styloop', collection: 'sessions'}),
        //     resave: false,
        //     saveUninitialized: true,
        // }));
        this.app.use(
            cors({
              origin: 'http://172.30.232.105:3000',
              credentials: true
            })
          );
    }


    private routes(): void {
        this.app.use('/api', Routes);

        this.app.use('*', (req, res) => {
            res.send("Request invalido");
        });
    }
}

export default new App().app;