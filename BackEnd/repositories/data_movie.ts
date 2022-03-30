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
        return this.db.query(`SELECT * FROM movies WHERE deleted=FALSE`);
    }

    public getListing() {
        return this.db.query(`SELECT * FROM current_cartelera()`);
    }

    public getSeats(info: any) {
        const statement = 'SELECT * FROM available_seats($1, $2, $3)';
        const values = [info.sala_name, info.movie_name, info.start_time];
        return this.db.query(statement, values);
    }

    public getTandasForMovie(info: any) {
        const statement = 'SELECT * FROM current_cartelera() WHERE movie_title = $1';
        const values = [info];
        return this.db.query(statement, values);
    }

    public getTanda(info: any) {
        console.log(info)
        const statement = 'SELECT * FROM chart WHERE chart_id = $1';
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
      console.log(info)
        const statement = 'INSERT INTO chart (start_time, price_general, price_children, price_elderly, sala_id, movie_id, end_time)' +
                          'OVERRIDING SYSTEM VALUE VALUES' +
                          '($1, $2, $3, $4, $5, $6, $7)';
        const values = [info.starttime, info.general, info.children, info.elderly, info.sala_id, info.movie_id, info.endtime];
        return this.db.query(statement, values);
    }  
    
    public delete(data : any) { 
      const statement = 'UPDATE movies SET deleted=TRUE WHERE movie_id=$1';
      const values = [data.movie_id]; 
      return this.db.query(statement, values);
    }

    public add(data : any) { 
      const statement = 'INSERT INTO movies'+
                        '(title, actors, description, director, duration, minimum_age, genre, languages, year, image, deleted) '+
                        'VALUES '+
                        '($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, false)';
      const values = [data.title, data.actors, data.description, 
                      data.director, data.duration, data.minimum_age, data.genre, 
                      data.languages, data.year, data.image];
      return this.db.query(statement, values);
  } 

  public update(movie_id : any, data : any) { 
    const statement = 'UPDATE movies SET title=$2, actors=$3, description=$4, director=$5, duration=$6, minimum_age=$7, genre=$8, languages=$9, year=$10, image=$11 WHERE movie_id=$1';
    const values = [movie_id, data.title, data.actors, data.description, 
                    data.director, data.duration, data.minimum_age, data.genre, 
                    data.languages, data.year, data.image];
    return this.db.query(statement, values);
  }

  public visible(data : any) { 
    const statement = 'UPDATE movies SET visible=$2 WHERE movie_id=$1';
    const values = [data.movie_id, data.visible]; 
    return this.db.query(statement, values);
  }

  public isAvailable(sala_id : any, tandatime : any) { 
    const statement = 'SELECT * FROM chart WHERE sala_id=$2 AND start_time <= $1 AND end_time > $1';
    const values = [tandatime, sala_id]; 
    return this.db.query(statement, values);
  }
}

