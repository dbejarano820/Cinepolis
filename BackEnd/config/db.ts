const Pool = require("pg").Pool;


class ConnectionPool {

    public db: any;

    public ConnectionPool() {
        this.db = new Pool({
            user:'postgres', // default postgres
            host:'94.74.72.199',
            database:'cinepolis_db', 
            password:'Rodri@123', 
            port:'5432' //default port
        });
    }
}

export default new ConnectionPool().db;