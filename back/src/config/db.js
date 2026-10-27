const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();

// Na nuvem o provedor costuma fornecer uma URL única (DATABASE_URL / MYSQL_URL).
// Localmente continua funcionando com as variáveis separadas do .env.
const url = process.env.DATABASE_URL || process.env.MYSQL_URL;

const config = url ? { uri: url } : {
    host: process.env.DB_HOST || process.env.db_host,
    port: process.env.DB_PORT || process.env.db_port || 3306,
    user: process.env.DB_USER || process.env.db_user,
    password: process.env.DB_PASSWORD || process.env.db_password,
    database: process.env.DB_DATABASE || process.env.db_database,
};

// Bancos gerenciados (Aiven, TiDB, etc.) exigem conexão com SSL.
// Ligado por padrão quando se usa DATABASE_URL; DB_SSL=false desliga.
const useSsl = process.env.DB_SSL ? process.env.DB_SSL === 'true' : Boolean(url);
if (useSsl) {
    config.ssl = { rejectUnauthorized: true };
    if (process.env.DB_CA_CERT) config.ssl.ca = process.env.DB_CA_CERT;
}

// Pool reconecta sozinho se o banco derrubar uma conexão ociosa,
// o que acontece com frequência em bancos na nuvem.
// Poucas conexões e liberadas rápido: planos gratuitos (ex.: Clever Cloud DEV)
// aceitam só algumas conexões simultâneas, e a Vercel roda várias instâncias.
const connection = mysql.createPool({
    ...config,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 2,
    maxIdle: 0,
    idleTimeout: 10000,
    enableKeepAlive: true,
    multipleStatements: true,
});

// Cria as tabelas na primeira execução, sem precisar do Workbench.
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
connection.query(schema, (err) => {
    if (err) {
        console.error('Erro ao conectar/criar tabelas no MySQL:', err.message);
    } else {
        console.log('Mysql connected!');
    }
});

module.exports = connection;
