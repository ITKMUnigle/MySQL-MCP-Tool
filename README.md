# MySQL MCP Tool

一个功能完整的 MySQL MCP (Model Context Protocol) 工具，支持通过 stdio 和 HTTP/SSE 两种传输方式与 AI 助手交互，实现对 MySQL 数据库的查询和管理。

## ✨ 功能特性

- **双模式传输**: 支持 stdio（标准输入输出）和 HTTP/SSE 两种 MCP 传输方式
- **完整的数据库操作**:
  - 查询数据 (SELECT)
  - 插入数据 (INSERT)
  - 更新数据 (UPDATE)
  - 删除数据 (DELETE)
  - 执行任意 SQL
  - 列出所有数据库
  - 列出所有表
  - 查看表结构 (DESCRIBE)
  - 创建/删除表 (DDL)
- **动态数据库切换**: 支持在运行时切换数据库
- **权限控制**: 默认只读模式，可通过配置开启写操作
- **连接池管理**: 使用 MySQL 连接池，支持高并发

## 📦 安装

### 方式一: npm 安装（推荐）

```bash
npm install -g itkmoon-mysql-mcp
```

### 方式二: GitHub 克隆

```bash
git clone https://github.com/ITKMUnigle/MySQL-MCP-Tool.git
cd MySQL-MCP-Tool
npm install
npm run build
```

## ⚙️ 配置

### 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `MCP_TRANSPORT` | 传输模式: `stdio` 或 `http` | `stdio` |
| `MCP_HTTP_PORT` | HTTP 端口（仅 http 模式） | `3000` |
| `MYSQL_HOST` | MySQL 地址 | `localhost` |
| `MYSQL_PORT` | MySQL 端口 | `3306` |
| `MYSQL_USER` | 用户名 | `root` |
| `MYSQL_PASSWORD` | 密码 | `root` |
| `MYSQL_DATABASE` | 默认数据库 | - |
| `MYSQL_ALLOW_WRITE` | 启用写操作 | `false` |

创建 `.env` 文件：

```env
MCP_TRANSPORT=stdio
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=your_database
MYSQL_ALLOW_WRITE=false
```

## 🚀 使用

### Claude Desktop 配置

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

### Cursor 配置

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

### Trae 配置

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

## 🛠️ 可用工具

| 工具 | 说明 |
|------|------|
| `mysql_query` | 执行 SELECT 查询 |
| `mysql_execute` | 执行任意 SQL（需写权限） |
| `mysql_list_databases` | 列出所有数据库 |
| `mysql_list_tables` | 列出数据库中的表 |
| `mysql_describe_table` | 查看表结构 |
| `mysql_use_database` | 切换数据库 |
| `mysql_get_current_database` | 获取当前数据库名 |
| `mysql_get_permissions` | 检查写权限 |

## 🔒 权限控制

默认只读模式，只允许 SELECT 查询。启用写操作：

```env
MYSQL_ALLOW_WRITE=true
```

## 📄 许可证

MIT License

## 🔗 链接

- [GitHub](https://github.com/ITKMUnigle/MySQL-MCP-Tool)
- [npm](https://www.npmjs.com/package/itkmoon-mysql-mcp)
