import { Pool } from 'pg';
import ConnectionPool from '../config/db';

export class checkout_data {

    public db : Pool;

    public constructor() {   
        this.db = new ConnectionPool().db;
    }

    public async payment(info : any) {
        console.log("Info Payment query");
        console.log(info);
        let statement = "";
        let values : any = {};
        info.products.forEach((product : any) => {
            if(product.type === "Ticket"){
                statement = "reserve_seat($1, %2, $3, $4, %5, %6, %7);";
                values = [info.toAddress, product.row, product.number, product.type,
                            product.movie, product.time, product.sala];
            }
            if(product.type === "Food"){
                statement = "reserve_food($1, %2);";
                values = [info.toAddress, product.food_name];
            }
        });
        await this.db.query("create_reservation();");
        await this.db.query(statement, values);
        await this.db.query("deactive_reservation();");
    } 
}


