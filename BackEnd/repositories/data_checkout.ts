import { Pool } from 'pg';
import ConnectionPool from '../config/db';

export class checkout_data {

    public db : Pool;

    public constructor() {   
        this.db = new ConnectionPool().db;
    }

    public payment() {
        return this.db.query(`SELECT * FROM reservations;`);
    } 
}


