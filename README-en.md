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

### Via npm (Recommended)

```bash
npm install -g itkmoon-mysql-mcp
```

### Via GitHub

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

Create a `.env` file:

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

### Claude Desktop Configuration

```json
{
  "mcpServers": {
    "MySQL MCP Tool": {
      "command": "node",
      "args": ["/path/to/node_modules/itkmoon-mysql-mcp/dist/index.js"],
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

```json
{
  "mcpServers": {
    "MySQL MCP Tool": {
      "command": "node",
      "args": ["/path/to/node_modules/itkmoon-mysql-mcp/dist/index.js"],
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

```json
{
  "mcp": {
    "servers": {
      "MySQL MCP Tool": {
        "command": "node",
        "args": ["/path/to/node_modules/itkmoon-mysql-mcp/dist/index.js"],
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

To enable write operations:

```env
MYSQL_ALLOW_WRITE=true
```

## 📄 License

MIT License

## 🔗 Links

- [GitHub Repository](https://github.com/ITKMUnigle/MySQL-MCP-Tool)
- [npm Package](https://www.npmjs.com/package/itkmoon-mysql-mcp)
