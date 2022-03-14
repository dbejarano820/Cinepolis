import db from '../config/db';

export class movie_data {

    public constructor() {   
    }

    public create(data: any) {

    }

    public list() {
        return db.query(`SELECT * FROM salas`);
    }

}

