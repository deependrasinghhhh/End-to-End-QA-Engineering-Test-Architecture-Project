import { Pool } from 'pg';
import { Logger } from './logger';

export class DbHelper {
  private static pool: Pool | null = null;

  static getPool(): Pool {
    if (!this.pool) {
      this.pool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'nopcommerce_qa',
        user: process.env.DB_USER || 'nop_qa',
        password: process.env.DB_PASSWORD || 'nop_secure_pwd_123',
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 3000
      });

      this.pool.on('error', (err) => {
        Logger.warn('PostgreSQL Pool background notice: ' + err.message);
      });
    }
    return this.pool;
  }

  static async query(text: string, params: any[] = []): Promise<any[]> {
    try {
      const client = this.getPool();
      const res = await client.query(text, params);
      return res.rows;
    } catch (err: any) {
      Logger.warn(`[DbHelper] Database query failed or PostgreSQL service not active locally: ${err.message}`);
      return [];
    }
  }

  static async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}
