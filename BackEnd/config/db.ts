import * as pg from 'pg';


export default class ConnectionPool {

    public db: pg.Pool;

    public constructor() {
        this.db = new pg.Pool({
            user:'postgres', // default postgres
            host:'cinepolis-db.ccmto6bttogz.us-east-1.rds.amazonaws.com',
            database:'cinepolis_db', 
            password:'postgres', 
            port:5432 //default port
        });
    }

}