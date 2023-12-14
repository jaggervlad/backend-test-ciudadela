import mysql from 'mysql2/promise';

let connectionIntance: mysql.Pool | null = null;

export async function createConnection() {
  if (!connectionIntance) {
    connectionIntance = mysql.createPool({
      database: 'platform-test',
      user: 'pywta51og2f1s5e1rodl',
      host: 'aws.connect.psdb.cloud',
      password: 'pscale_pw_5Rl7Hnn7Z5k7UUOQejmRfyBnPWrGD3Le2teIaoPrsoZ',
      ssl: {
        rejectUnauthorized: true,
      },
    });
  }

  return connectionIntance;
}
