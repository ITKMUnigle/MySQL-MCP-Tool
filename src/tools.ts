/**
 * MySQL MCP Tool - MCP Tool Definitions
 */

import type { Tool } from '@modelcontextprotocol/sdk/types.js';

export const tools: Tool[] = [
  {
    name: 'mysql_query',
    description: 'Execute a SELECT query on the MySQL database',
    inputSchema: {
      type: 'object',
      properties: {
        sql: {
          type: 'string',
          description: 'The SQL SELECT query to execute',
        },
        database: {
          type: 'string',
          description: 'Optional database name to use for this query',
        },
      },
      required: ['sql'],
    },
  },
  {
    name: 'mysql_execute',
    description: 'Execute any SQL statement (INSERT, UPDATE, DELETE, CREATE, etc.). Requires write permissions.',
    inputSchema: {
      type: 'object',
      properties: {
        sql: {
          type: 'string',
          description: 'The SQL statement to execute',
        },
        database: {
          type: 'string',
          description: 'Optional database name to use for this query',
        },
      },
      required: ['sql'],
    },
  },
  {
    name: 'mysql_list_databases',
    description: 'List all databases in the MySQL server',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'mysql_list_tables',
    description: 'List all tables in the specified or current database',
    inputSchema: {
      type: 'object',
      properties: {
        database: {
          type: 'string',
          description: 'Optional database name. Uses current database if not specified',
        },
      },
    },
  },
  {
    name: 'mysql_describe_table',
    description: 'Show the structure of a table (columns, types, keys, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        table: {
          type: 'string',
          description: 'The table name to describe',
        },
        database: {
          type: 'string',
          description: 'Optional database name. Uses current database if not specified',
        },
      },
      required: ['table'],
    },
  },
  {
    name: 'mysql_use_database',
    description: 'Switch to a different database',
    inputSchema: {
      type: 'object',
      properties: {
        database: {
          type: 'string',
          description: 'The database name to switch to',
        },
      },
      required: ['database'],
    },
  },
  {
    name: 'mysql_get_current_database',
    description: 'Get the name of the currently selected database',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'mysql_get_permissions',
    description: 'Check if write operations are allowed',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

export const toolDescriptions = {
  mysql_query: 'Execute SELECT queries to retrieve data',
  mysql_execute: 'Execute any SQL statement (requires write permission)',
  mysql_list_databases: 'List all available databases',
  mysql_list_tables: 'List tables in a database',
  mysql_describe_table: 'Show table structure',
  mysql_use_database: 'Switch database context',
  mysql_get_current_database: 'Get current database name',
  mysql_get_permissions: 'Check write permissions',
};
