import { Pool } from 'pg';
import ConnectionPool from '../config/db';

export class movie_data {

    public db : Pool;

    public constructor() {   
        this.db = new ConnectionPool().db;
    }

    public create(data: any) {

    }

    public listSalas() {
        return this.db.query(`SELECT * FROM salas`);
    }

    public listMovies() {
        return this.db.query(`SELECT * FROM movies`);
    }

    public getListing() {
        return this.db.query(`SELECT * FROM current_cartelera()`);
    }

    public getSeats(info: any) {
        const statement = 'SELECT * FROM available_seats($1, $2, $3)';
        const values = [info.sala, info.movie, info.time];
        return this.db.query(statement, values);
    }

    public getTandasForMovie(info: any) {
        const statement = 'SELECT * FROM current_cartelera() WHERE movie_title = $1';
        const values = [info];
        return this.db.query(statement, values);
    }

    public getMovie(info: any) {
        const statement = 'SELECT * FROM movies WHERE title = $1';
        const values = [info];
        return this.db.query(statement, values);
    }

    public createReservation(info: any) {
        const statement = 'SELECT create_reservation($1)';
        const values = [info.email];
        return this.db.query(statement, values);
    }

    public deactiveReservation(info: any) {
        const statement = 'SELECT deactive_reservation($1)';
        const values = [info.email];
        return this.db.query(statement, values);
    }

    public reserveSeat(info: any) {
        const statement = 'SELECT reserve_seat($1, $2, $3, $4, $5, $6, $7)';
        const values = [info.email, info.row, info.number, info.type, info.movie, info.starttime, info.sala];
        return this.db.query(statement, values);
    }

    public reserveFood(info: any) {
        const statement = 'SELECT reserve_food($1, $2)';
        const values = [info.email, info.food];
        return this.db.query(statement, values);
    }

    public addChart(info: any) {
        const statement = 'SELECT add_chart($1, $2, $3, $4, $5, $6)';
        const values = [info.sala, info.movie, info.starttime, info.general, info.children, info.elderly];
        return this.db.query(statement, values);
    }    
}

