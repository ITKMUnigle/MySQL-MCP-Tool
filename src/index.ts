/**
 * MySQL MCP Tool - Entry Point
 */

import { MySQLMCPServer } from './server.js';

async function main() {
  const server = new MySQLMCPServer();

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.error('\nShutting down...');
    await server.stop();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.error('\nShutting down...');
    await server.stop();
    process.exit(0);
  });

  try {
    await server.start();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to start server:', errorMessage);
    process.exit(1);
  }
}

main();
