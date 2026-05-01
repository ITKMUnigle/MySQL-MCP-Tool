/**
 * MySQL MCP Tool - MySQL Client
 */

import mysql from 'mysql2/promise';
import type { MySQLConfig, QueryResult, DatabaseInfo, TableInfo, ColumnInfo } from './types.js';

export class MySQLClient {
  private pool: mysql.Pool | null = null;
  private config: MySQLConfig;

  constructor(config: MySQLConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    this.pool = mysql.createPool({
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: this.config.password,
      database: this.config.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

    // Test connection
    const connection = await this.pool.getConnection();
    connection.release();
    console.error('MySQL connected successfully');
  }

  async disconnect(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      console.error('MySQL disconnected');
    }
  }

  isWriteOperation(sql: string): boolean {
    const writeKeywords = ['INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER', 'TRUNCATE', 'REPLACE'];
    const normalizedSql = sql.trim().toUpperCase();
    return writeKeywords.some(keyword => normalizedSql.startsWith(keyword));
  }

  async executeQuery(sql: string, params?: any[]): Promise<QueryResult> {
    if (!this.pool) {
      return { success: false, error: 'Not connected to MySQL' };
    }

    if (this.isWriteOperation(sql) && !this.config.allowWriteOperations) {
      return {
        success: false,
        error: 'Write operations are not allowed. Set MYSQL_ALLOW_WRITE=true to enable.',
      };
    }

    try {
      const [results] = await this.pool.query(sql, params);

      if (Array.isArray(results)) {
        return {
          success: true,
          data: results as any[],
        };
      } else {
        return {
          success: true,
          affectedRows: (results as mysql.ResultSetHeader).affectedRows,
          insertId: (results as mysql.ResultSetHeader).insertId,
          message: `Query executed successfully. Affected rows: ${(results as mysql.ResultSetHeader).affectedRows}`,
        };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async listDatabases(): Promise<QueryResult> {
    const sql = 'SHOW DATABASES';
    return this.executeQuery(sql);
  }

  async listTables(database?: string): Promise<QueryResult> {
    let sql: string;
    if (database) {
      sql = `SHOW TABLES FROM \`${database}\``;
    } else if (this.config.database) {
      sql = 'SHOW TABLES';
    } else {
      return {
        success: false,
        error: 'No database selected. Please specify a database or set MYSQL_DATABASE.',
      };
    }
    return this.executeQuery(sql);
  }

  async describeTable(table: string, database?: string): Promise<QueryResult> {
    const fullTableName = database ? `\`${database}\`.\`${table}\`` : `\`${table}\``;
    const sql = `DESCRIBE ${fullTableName}`;
    return this.executeQuery(sql);
  }

  async useDatabase(database: string): Promise<void> {
    if (!this.pool) {
      throw new Error('Not connected to MySQL');
    }
    await this.pool.query(`USE \`${database}\``);
    this.config.database = database;
  }

  getCurrentDatabase(): string | undefined {
    return this.config.database;
  }

  isWriteAllowed(): boolean {
    return this.config.allowWriteOperations;
  }
}
