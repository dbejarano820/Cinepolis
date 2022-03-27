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
        return this.db.query(`SELECT * FROM food WHERE deleted=FALSE`);
    } 
    
    public find(name : any) {
        const statement = 'SELECT * FROM food where name=$1 AND deleted=FALSE';
        const values = [name];
        return this.db.query(statement, values);
    }  
    
    public addFood(data : any) { 
        const statement = 'INSERT INTO food'+
                          '(name, price, type, amount_available, image, description, deleted) '+
                          'VALUES '+
                          '($1, $2, $3, $4, $5, $6, false)';
        const values = [data.name, data.price, data.type, data.amount_available, data.image, data.description];
        return this.db.query(statement, values);
    } 

    public deleteFood(data : any) { 
        const statement = 'UPDATE food SET deleted=TRUE WHERE food_id=$1';
        const values = [data.food_id];
        return this.db.query(statement, values);
    }
}


