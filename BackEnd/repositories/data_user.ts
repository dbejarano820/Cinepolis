import { Pool } from 'pg';
import ConnectionPool from '../config/db';
import DEFAULT_PASSWORD from '../controllers/usercontroller'

export class user_data {

    public db : Pool;

    public constructor() {   
        this.db = new ConnectionPool().db;
    }

    public login(info: any) {
        const statement =   `SELECT ut.name AS type, u.email, u.name, u.lastname, u.secondlastname, u.vaccines, u.birthday
                                FROM public.user_type AS ut
                                INNER JOIN public.users AS u ON u.usertype_id = ut.usertype_id
                            WHERE u.email = $1 AND u.password = $2`;
        const values = [info.email, info.pass];
        return this.db.query(statement, values);
    }

    public register(info: any) {
        const values = [info.name, info.lastname, info.secondlastname, info.email, 
                        'cinepolis_pass', info.birthday, info.vaccines, info.idcard_number]       
        const statement =   `INSERT INTO users 
                              (usertype_id, name, lastname, secondlastname, email, created_on, 
                              password, birthday, vaccines, idcard_number, deleted)
                            OVERRIDING SYSTEM VALUE
                            VALUES(1, $1, $2, $3, $4, now(), $5, $6, $7, $8, FALSE);`;  //usertype_id is 1 bc Client is id = 1.
        return this.db.query(statement, values);
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
                      '(name, lastname, email, password, birthday, vaccines, created_on, usertype_id, secondlastname, deleted) '+
                      'OVERRIDING SYSTEM VALUE VALUES '+
                      '($1, $2, $3, $4, $5, $6, NOW(),  $7, $8, false)';
    const values = [data.name, data.lastname, data.email, data.password, data.birthday, data.vaccines, data.usertype_id, data.secondlastname];
    return this.db.query(statement, values);
  }

  public update(user_id : any, data : any) { 
    // console.log('REPO')
    // console.log(user_id, data)
    const statement = 'UPDATE users SET name=$2, lastname=$3, email=$4, password=$5, birthday=$6, vaccines=$7, secondlastname=$8 WHERE user_id=$1';
    const values = [user_id, data.name, data.lastname, data.email, data.password, data.birthday, data.vaccines, data.secondlastname];
    return this.db.query(statement, values);
  }

}