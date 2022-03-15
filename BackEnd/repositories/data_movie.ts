import { Pool } from 'pg';
import ConnectionPool from '../config/db';

export class movie_data {

    public db : Pool;

    public constructor() {   
        this.db = new ConnectionPool().db;
    }

    public create(data: any) {

    }

    public list() {
        return this.db.query(`SELECT * FROM salas`);
    }

}

