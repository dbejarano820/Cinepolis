import { Pool } from 'pg';
import ConnectionPool from '../config/db';

export class checkout_data {

    public db : Pool;

    public constructor() {   
        this.db = new ConnectionPool().db;
    }

    public payment(info : any) {
        console.log("Info Payment query");
        
        console.log(info);
        
        return this.db.query(`SELECT * FROM reservations;`);
    } 
}


