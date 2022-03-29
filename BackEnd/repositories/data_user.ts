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

    public list() {
      return this.db.query(`SELECT * FROM users WHERE deleted=FALSE`);
    } 

    public find(email : any) {
      const statement = 'SELECT * FROM users where email=$1 AND deleted=FALSE';
      const values = [email];
      return this.db.query(statement, values);
  } 

  public delete(data : any) { 
    const statement = 'UPDATE users SET deleted=TRUE WHERE user_id=$1';
    const values = [data.user_id];
    return this.db.query(statement, values);
  }

  public add(data : any) { 
    const statement = 'INSERT INTO users'+
                      '(name, lastname, password, birthday, vaccines, usertype_id, secondlastname, deleted) '+
                      'VALUES '+
                      '($1, $2, $3, $4, $5, $6, $7, false)';
    const values = [data.name, data.lastname, data.password, data.birthday, data.vaccines, data.usertype_id, data.secondlastname];
    return this.db.query(statement, values);
  }

}