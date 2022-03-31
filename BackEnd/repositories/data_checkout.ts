import { Pool } from 'pg';
import ConnectionPool from '../config/db';

export class checkout_data {

    public db : Pool;

    public constructor() {   
        this.db = new ConnectionPool().db;
    }

    public async payment(info : any) {
        await this.db.query("select create_reservation($1);", [info.toAddress]);
        let statement = "";
        let values : any = {};
        await info.products.forEach(async (product : any) => {
            if(product.type === "Ticket"){
                statement = "select reserve_seat($1, $2, $3, $4, $5, $6, $7);";
                values = [info.toAddress, product.row, product.num, product.type,
                            product.movie, product.time, product.sala];
            }
            if(product.type === "Food"){
                statement = "select reserve_food($1, $2);";
                values = [info.toAddress, product.food_name];
            }
            await this.db.query(statement, values);
        });
        await this.db.query("select deactive_reservation($1);", [info.toAddress]);
    } 
}


