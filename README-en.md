# MySQL MCP Tool

A powerful Model Context Protocol (MCP) tool for MySQL database operations, supporting both stdio and HTTP/SSE transport protocols. Perfect for AI assistants like Cursor, Trae, and Claude Desktop.

## ✨ Features

- **Dual Transport Mode**: Supports stdio (for IDE integration) and HTTP/SSE (for remote access)
- **Complete Database Operations**:
  - Query data (SELECT)
  - Insert data (INSERT)
  - Update data (UPDATE)
  - Delete data (DELETE)
  - Execute arbitrary SQL
  - List all databases
  - List all tables
  - View table structure (DESCRIBE)
  - Create/Drop tables (DDL)
- **Dynamic Database Switching**: Switch databases at runtime
- **Permission Control**: Read-only by default, configurable write access
- **Connection Pool Management**: MySQL connection pool for high concurrency

## 📦 Installation

### Prerequisites

- Node.js >= 18.0.0
- MySQL server (local or remote)

### Install via npm

```bash
npm install -g @itkmoon/mysql-mcp
```

### Install via GitHub

```bash
git clone https://github.com/ITKMUnigle/MySQL-MCP-Tool.git
cd MySQL-MCP-Tool
npm install
npm run build
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MCP_TRANSPORT` | Transport mode: `stdio` or `http` | `stdio` |
| `MCP_HTTP_PORT` | HTTP server port (only for http mode) | `3000` |
| `MYSQL_HOST` | MySQL host | `localhost` |
| `MYSQL_PORT` | MySQL port | `3306` |
| `MYSQL_USER` | MySQL username | `root` |
| `MYSQL_PASSWORD` | MySQL password | `root` |
| `MYSQL_DATABASE` | Default database (optional) | - |
| `MYSQL_ALLOW_WRITE` | Enable write operations | `false` |

### .env File

Create a `.env` file in the project root:

```env
MCP_TRANSPORT=stdio
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=your_database
MYSQL_ALLOW_WRITE=false
```

## 🚀 Usage

### CLI Mode

```bash
# Stdio mode (for IDE integration)
npm run start:stdio

# HTTP mode (for remote access)
npm run start:http
```

### Claude Desktop Configuration

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mysql": {
      "command": "node",
      "args": ["/path/to/node_modules/@itkmoon/mysql-mcp/dist/index.js"],
      "env": {
        "MYSQL_HOST": "localhost",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "root",
        "MYSQL_PASSWORD": "your_password",
        "MYSQL_DATABASE": "your_database",
        "MYSQL_ALLOW_WRITE": "false"
      }
    }
  }
}
```

### Cursor Configuration

Add to `%USERPROFILE%\.cursor\mcp.json`:

```json
{
  "mcpServers": {
    "mysql": {
      "command": "node",
      "args": ["/path/to/node_modules/@itkmoon/mysql-mcp/dist/index.js"],
      "env": {
        "MYSQL_HOST": "localhost",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "root",
        "MYSQL_PASSWORD": "your_password",
        "MYSQL_DATABASE": "your_database",
        "MYSQL_ALLOW_WRITE": "false"
      }
    }
  }
}
```

### Trae Configuration

Add to `%APPDATA%\Trae\mcp.json`:

```json
{
  "mcp": {
    "servers": {
      "mysql": {
        "command": "node",
        "args": ["/path/to/node_modules/@itkmoon/mysql-mcp/dist/index.js"],
        "env": {
          "MYSQL_HOST": "localhost",
          "MYSQL_PORT": "3306",
          "MYSQL_USER": "root",
          "MYSQL_PASSWORD": "your_password",
          "MYSQL_DATABASE": "your_database",
          "MYSQL_ALLOW_WRITE": "false"
        }
      }
    }
  }
}
```

## 🛠️ Available Tools

| Tool | Description |
|------|-------------|
| `mysql_query` | Execute SELECT queries |
| `mysql_execute` | Execute any SQL (requires write permission) |
| `mysql_list_databases` | List all databases |
| `mysql_list_tables` | List tables in a database |
| `mysql_describe_table` | Show table structure |
| `mysql_use_database` | Switch database context |
| `mysql_get_current_database` | Get current database name |
| `mysql_get_permissions` | Check write permissions |

## 🔒 Permission Control

By default, the tool runs in **read-only mode** and only allows SELECT queries.

To enable write operations (INSERT, UPDATE, DELETE, CREATE, DROP, etc.):

```env
MYSQL_ALLOW_WRITE=true
```

**Security Note**: When enabling write operations, ensure:
- Use a MySQL user with appropriate permissions
- Avoid using the root user in production
- Limit database access scope

## 💡 Usage Examples

### List all databases

```
Please list all databases in MySQL
```

### Query with database switch

```
Switch to test database, then query all data from users table
```

### View table structure

```
Show the structure of the orders table
```

### Execute complex query

```
Execute SQL: SELECT department, COUNT(*) as count FROM employees GROUP BY department
```

### Insert data (requires write permission)

```
Insert a new record into employees table: name: John, department: IT, salary: 5000
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Development mode (watch)
npm run dev

# Lint
npm run lint

# Type check
npm run typecheck
```

## 📁 Project Structure

```
mysql-mcp-tool/
├── src/
│   ├── index.ts          # Entry point
│   ├── server.ts         # MCP server implementation
│   ├── mysql-client.ts   # MySQL client with connection pool
│   ├── tools.ts          # MCP tool definitions
│   ├── config.ts         # Configuration management
│   └── types.ts          # TypeScript type definitions
├── dist/                 # Compiled JavaScript
├── .env.example          # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## 📄 License

MIT License

## 🔗 Links

- [GitHub Repository](https://github.com/ITKMUnigle/MySQL-MCP-Tool)
- [Report Issues](https://github.com/ITKMUnigle/MySQL-MCP-Tool/issues)
