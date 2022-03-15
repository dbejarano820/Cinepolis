import * as pg from 'pg';


export default class ConnectionPool {

    public db: pg.Pool;

    public constructor() {
        this.db = new pg.Pool({
            user:'postgres', // default postgres
            host:'94.74.72.199',
            database:'cinepolis_db', 
            password:'postgres', 
            port:5432 //default port
        });
    }

}