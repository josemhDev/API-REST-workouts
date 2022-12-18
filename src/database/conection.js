const { Pool } = require("pg");
const { DB_HOST, DB_PASSWORD, DB_NAME, DB_PORT, DB_USER } = require("../config")



    const pool = new Pool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: DB_PORT
    })




module.exports = {

    pool
}