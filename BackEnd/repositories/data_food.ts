import { Pool } from 'pg';
import ConnectionPool from '../config/db';

export class food_data {

    public db : Pool;

    public constructor() {   
        this.db = new ConnectionPool().db;
    }

    public create(data: any) {

    }

    public list() {
        return this.db.query(`SELECT * FROM food`);
    } 
    
    public find(foodId : any) {
        const statement = 'SELECT * FROM food where food_id=$1';
        const values = [foodId];
        return this.db.query(statement, values);
    }    
}


