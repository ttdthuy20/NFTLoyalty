const sql = require('mssql');

const config = {
    user: 'sa',
    password: '123456',
    database: 'loyalty_nft',
    server: 'DESKTOP-OV7Q0HA\\SQLEXPRESS',
    options: {
        trustServerCertificate: true
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = { sql, poolConnect, pool };
