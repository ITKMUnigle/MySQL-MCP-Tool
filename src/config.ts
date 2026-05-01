/**
 * MySQL MCP Tool - Configuration Management
 */

import type { MySQLConfig, ServerConfig, TransportType } from './types.js';

export function loadConfig(): ServerConfig {
  const transport = (process.env.MCP_TRANSPORT as TransportType) || 'stdio';
  const httpPort = parseInt(process.env.MCP_HTTP_PORT || '3000', 10);

  const mysqlConfig: MySQLConfig = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306', 10),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE || undefined,
    allowWriteOperations: process.env.MYSQL_ALLOW_WRITE === 'true',
  };

  return {
    transport,
    httpPort,
    mysql: mysqlConfig,
  };
}

export function getMySQLConfig(): MySQLConfig {
  return loadConfig().mysql;
}

export function validateConfig(config: MySQLConfig): string | null {
  if (!config.host) {
    return 'MySQL host is required';
  }
  if (!config.port || config.port < 1 || config.port > 65535) {
    return 'MySQL port must be between 1 and 65535';
  }
  if (!config.user) {
    return 'MySQL user is required';
  }
  return null;
}
