/**
 * MySQL MCP Tool - MCP Server Implementation
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type CallToolRequest,
  type ListToolsRequest,
} from '@modelcontextprotocol/sdk/types.js';
import express from 'express';
import cors from 'cors';
import type { Request, Response } from 'express';
import { MySQLClient } from './mysql-client.js';
import { tools } from './tools.js';
import { loadConfig, validateConfig } from './config.js';
import type { ServerConfig, QueryResult } from './types.js';

export class MySQLMCPServer {
  private server: Server;
  private mysqlClient: MySQLClient;
  private config: ServerConfig;

  constructor() {
    this.config = loadConfig();
    this.mysqlClient = new MySQLClient(this.config.mysql);

    this.server = new Server(
      {
        name: 'mysql-mcp-tool',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async (request: ListToolsRequest) => {
      return { tools };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest) => {
      const { name, arguments: args } = request.params;

      try {
        let result: QueryResult;

        switch (name) {
          case 'mysql_query': {
            const { sql, database } = args as { sql: string; database?: string };
            if (database) {
              await this.mysqlClient.useDatabase(database);
            }
            result = await this.mysqlClient.executeQuery(sql);
            break;
          }

          case 'mysql_execute': {
            const { sql, database } = args as { sql: string; database?: string };
            if (database) {
              await this.mysqlClient.useDatabase(database);
            }
            result = await this.mysqlClient.executeQuery(sql);
            break;
          }

          case 'mysql_list_databases': {
            result = await this.mysqlClient.listDatabases();
            break;
          }

          case 'mysql_list_tables': {
            const { database } = args as { database?: string };
            result = await this.mysqlClient.listTables(database);
            break;
          }

          case 'mysql_describe_table': {
            const { table, database } = args as { table: string; database?: string };
            result = await this.mysqlClient.describeTable(table, database);
            break;
          }

          case 'mysql_use_database': {
            const { database } = args as { database: string };
            await this.mysqlClient.useDatabase(database);
            result = {
              success: true,
              message: `Switched to database: ${database}`,
            };
            break;
          }

          case 'mysql_get_current_database': {
            const currentDb = this.mysqlClient.getCurrentDatabase();
            result = {
              success: true,
              data: [{ current_database: currentDb || null }],
            };
            break;
          }

          case 'mysql_get_permissions': {
            result = {
              success: true,
              data: [{
                allow_write: this.mysqlClient.isWriteAllowed(),
                current_database: this.mysqlClient.getCurrentDatabase(),
              }],
            };
            break;
          }

          default:
            return {
              content: [
                {
                  type: 'text',
                  text: `Unknown tool: ${name}`,
                },
              ],
              isError: true,
            };
        }

        // Format result
        const text = result.success
          ? result.data
            ? JSON.stringify(result.data, null, 2)
            : result.message || 'Operation completed successfully'
          : `Error: ${result.error}`;

        return {
          content: [
            {
              type: 'text',
              text,
            },
          ],
          isError: !result.success,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async start(): Promise<void> {
    // Validate configuration
    const validationError = validateConfig(this.config.mysql);
    if (validationError) {
      throw new Error(`Configuration error: ${validationError}`);
    }

    // Connect to MySQL
    await this.mysqlClient.connect();

    // Start server based on transport type
    if (this.config.transport === 'stdio') {
      await this.startStdioServer();
    } else {
      await this.startHttpServer();
    }
  }

  private async startStdioServer(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('MySQL MCP Server running on stdio');
  }

  private async startHttpServer(): Promise<void> {
    const app = express();
    app.use(cors());
    app.use(express.json());

    const port = this.config.httpPort || 3000;

    // SSE endpoint for MCP
    app.get('/sse', async (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // Send initial connection message
      res.write(`data: ${JSON.stringify({ type: 'connection', status: 'connected' })}\n\n`);

      // Keep connection alive
      const keepAlive = setInterval(() => {
        res.write(`data: ${JSON.stringify({ type: 'ping' })}\n\n`);
      }, 30000);

      req.on('close', () => {
        clearInterval(keepAlive);
      });
    });

    // POST endpoint for tool calls
    app.post('/tools/:toolName', async (req: Request, res: Response) => {
      const { toolName } = req.params;
      const args = req.body;

      try {
        let result: QueryResult;

        switch (toolName) {
          case 'mysql_query': {
            const { sql, database } = args;
            if (database) {
              await this.mysqlClient.useDatabase(database);
            }
            result = await this.mysqlClient.executeQuery(sql);
            break;
          }

          case 'mysql_execute': {
            const { sql, database } = args;
            if (database) {
              await this.mysqlClient.useDatabase(database);
            }
            result = await this.mysqlClient.executeQuery(sql);
            break;
          }

          case 'mysql_list_databases': {
            result = await this.mysqlClient.listDatabases();
            break;
          }

          case 'mysql_list_tables': {
            const { database } = args;
            result = await this.mysqlClient.listTables(database);
            break;
          }

          case 'mysql_describe_table': {
            const { table, database } = args;
            result = await this.mysqlClient.describeTable(table, database);
            break;
          }

          case 'mysql_use_database': {
            const { database } = args;
            await this.mysqlClient.useDatabase(database);
            result = {
              success: true,
              message: `Switched to database: ${database}`,
            };
            break;
          }

          case 'mysql_get_current_database': {
            const currentDb = this.mysqlClient.getCurrentDatabase();
            result = {
              success: true,
              data: [{ current_database: currentDb || null }],
            };
            break;
          }

          case 'mysql_get_permissions': {
            result = {
              success: true,
              data: [{
                allow_write: this.mysqlClient.isWriteAllowed(),
                current_database: this.mysqlClient.getCurrentDatabase(),
              }],
            };
            break;
          }

          default:
            res.status(404).json({ error: `Unknown tool: ${toolName}` });
            return;
        }

        if (result.success) {
          res.json(result);
        } else {
          res.status(400).json({ error: result.error });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: errorMessage });
      }
    });

    // List tools endpoint
    app.get('/tools', (req: Request, res: Response) => {
      res.json({ tools });
    });

    // Health check
    app.get('/health', (req: Request, res: Response) => {
      res.json({
        status: 'healthy',
        mysql_connected: true,
        allow_write: this.mysqlClient.isWriteAllowed(),
        current_database: this.mysqlClient.getCurrentDatabase(),
      });
    });

    app.listen(port, () => {
      console.error(`MySQL MCP Server running on HTTP port ${port}`);
      console.error(`Health check: http://localhost:${port}/health`);
      console.error(`Tools list: http://localhost:${port}/tools`);
      console.error(`SSE endpoint: http://localhost:${port}/sse`);
    });
  }

  async stop(): Promise<void> {
    await this.mysqlClient.disconnect();
  }
}
