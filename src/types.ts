/**
 * MySQL MCP Tool - Type Definitions
 */

export interface MySQLConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database?: string;
  allowWriteOperations: boolean;
}

export interface QueryResult {
  success: boolean;
  data?: any[];
  affectedRows?: number;
  insertId?: number;
  message?: string;
  error?: string;
}

export interface DatabaseInfo {
  name: string;
}

export interface TableInfo {
  name: string;
}

export interface ColumnInfo {
  Field: string;
  Type: string;
  Null: string;
  Key: string;
  Default: string | null;
  Extra: string;
}

export type TransportType = 'stdio' | 'http';

export interface ServerConfig {
  transport: TransportType;
  httpPort?: number;
  mysql: MySQLConfig;
}
