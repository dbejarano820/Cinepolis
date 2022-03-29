import { Pool } from 'pg';
import ConnectionPool from '../config/db';

export class user_data {

    public db : Pool;

    public constructor() {   
        this.db = new ConnectionPool().db;
    }

    public login(info: any) {
        const statement =   `SELECT ut.name AS type, u.email, u.name, u.lastname, u.secondlastname, u.vaccines
                                FROM public.user_type AS ut
                                INNER JOIN public.users AS u ON u.usertype_id = ut.usertype_id
                            WHERE u.email = $1 AND u.password = $2`;
        const values = [info.email, info.pass];
        return this.db.query(statement, values);
    }

    public register(info: any) {
        const statement = `SELECT 1`;
        return this.db.query(statement);


        /*const statement =   `INSERT INTO public.users (name, lastname, secondlastname, email, 
                                                        password, birthday, vaccines, 
                                                        created_on, usertype_id)
                            OVERRIDING SYSTEM VALUE
                            VALUES ($1, $2, $3, $4, $5, 
                                    $6, $7, $8, $9);`;
        const values = [info.name, info.lastname, info.secondlastname, info.email, 
            "dummy_init_pass", info.birthday, info.vaccines, '2022-10-05 14:01:10-08', 1];
        return this.db.query(statement, values);*/
    }

}