import mysql from 'mysql2/promise';

let connectionIntance: mysql.Pool | null = null;

export async function createConnection() {
  if (!connectionIntance) {
    connectionIntance = mysql.createPool({
      database: 'platform-test',
      user: '7ppc5kkscd1wzuckzfdd',
      host: 'aws.connect.psdb.cloud',
      password: 'pscale_pw_e8wTQEAbUROkHk1mjk6wUeLnBxXOoJKTr7s6JvvWlNw',
      ssl: {
        rejectUnauthorized: true,
      },
    });
  }

  return connectionIntance;
}
