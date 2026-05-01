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

### 1. 克隆或下载项目

```bash
cd mysql-mcp-tool
```

### 2. 安装依赖

```bash
npm install
```

### 3. 编译 TypeScript

```bash
npm run build
```

### 4. 配置环境变量

复制 `.env.example` 为 `.env` 并修改配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# 传输模式: stdio 或 http
MCP_TRANSPORT=stdio

# HTTP 端口 (仅在 MCP_TRANSPORT=http 时使用)
MCP_HTTP_PORT=3000

# MySQL 连接配置
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=root

# 可选: 默认数据库
# MYSQL_DATABASE=mydb

# 启用写操作 (INSERT, UPDATE, DELETE, CREATE, DROP 等)
# 默认: false (只读模式)
MYSQL_ALLOW_WRITE=false
```

## 🚀 使用方式

### 方式一: Stdio 模式（推荐用于 Claude Desktop 等 IDE）

```bash
# 使用环境变量配置
npm run start:stdio

# 或
node dist/index.js --stdio
```

**Claude Desktop 配置示例**:

编辑 `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "MySQL MCP Tool": {
      "command": "node",
      "args": [
        "your_project_path/mysql-server/dist/index.js"
      ],
      "env": {
        "MYSQL_HOST": "localhost",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "root",
        "MYSQL_PASSWORD": "root",
        "MYSQL_ALLOW_WRITE": "false"
      }
    }
  }
}
```

**Cursor 配置示例**:

编辑 `cursor_config.json`:

```json
{
  "mcpServers": {
    "MySQL MCP Tool": {
      "command": "node",
      "args": [
        "your_project_path/mysql-server/dist/index.js"
      ],
      "env": {
        "MYSQL_HOST": "localhost",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "root",
        "MYSQL_PASSWORD": "root",
        "MYSQL_ALLOW_WRITE": "false"
      }
    }
  }
}
```

**Trae 配置示例**:

编辑 `trae-config.json`:

```json
{
  "mcpServers": {
    "MySQL MCP Tool": {
      "command": "node",
      "args": [
        "your_project_path/mysql-server/dist/index.js"
      ],
      "env": {
        "MYSQL_HOST": "localhost",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "root",
        "MYSQL_PASSWORD": "root",
        "MYSQL_ALLOW_WRITE": "false"
      }
    }
  }
}
```

### 方式二: HTTP 模式（推荐用于远程调用）

```bash
# 使用环境变量配置
npm run start:http

# 或
node dist/index.js --http
```

启动后会显示：

- Health Check: <http://localhost:3000/health>
- Tools List: <http://localhost:3000/tools>
- SSE Endpoint: <http://localhost:3000/sse>

## 🛠️ 可用工具

### 1. mysql\_query

执行 SELECT 查询语句

**参数**:

- `sql` (string, 必需): SQL SELECT 查询语句
- `database` (string, 可选): 要使用的数据库名

**示例**:

```json
{
  "sql": "SELECT * FROM users WHERE age > 18",
  "database": "mydb"
}
```

### 2. mysql\_execute

执行任意 SQL 语句（需要写权限）

**参数**:

- `sql` (string, 必需): SQL 语句
- `database` (string, 可选): 要使用的数据库名

**示例**:

```json
{
  "sql": "INSERT INTO users (name, email) VALUES ('张三', 'zhangsan@example.com')"
}
```

### 3. mysql\_list\_databases

列出所有数据库

**参数**: 无

### 4. mysql\_list\_tables

列出指定或当前数据库中的所有表

**参数**:

- `database` (string, 可选): 数据库名，不指定则使用当前数据库

### 5. mysql\_describe\_table

查看表结构

**参数**:

- `table` (string, 必需): 表名
- `database` (string, 可选): 数据库名

### 6. mysql\_use\_database

切换到指定数据库

**参数**:

- `database` (string, 必需): 数据库名

### 7. mysql\_get\_current\_database

获取当前数据库名

**参数**: 无

### 8. mysql\_get\_permissions

检查写权限状态

**参数**: 无

## 🔒 权限控制

默认情况下，工具以**只读模式**运行，只允许执行 SELECT 查询。

要启用写操作（INSERT、UPDATE、DELETE、CREATE、DROP 等），需要：

1. 设置环境变量 `MYSQL_ALLOW_WRITE=true`
2. 或在 Claude Desktop 配置中添加 `"MYSQL_ALLOW_WRITE": "true"`

**安全提示**: 在生产环境中使用写操作时，请确保：

- 使用具有适当权限的 MySQL 用户
- 避免使用 root 用户
- 限制可访问的数据库范围

## 📝 使用示例

### 示例 1: 列出所有数据库

```
请帮我列出 MySQL 中的所有数据库
```

### 示例 2: 切换数据库并查询

```
切换到 test 数据库，然后查询 users 表中的所有数据
```

### 示例 3: 查看表结构

```
查看 users 表的结构
```

### 示例 4: 执行复杂查询

```
执行 SQL: SELECT department, COUNT(*) as count FROM employees GROUP BY department
```

### 示例 5: 插入数据（需要写权限）

```
在 employees 表中插入一条新记录: 姓名: 李四, 部门: 技术部, 工资: 8000
```

## 🔧 开发

### 开发模式

```bash
npm run dev
```

### 代码检查

```bash
npm run lint
```

### 类型检查

```bash
npm run typecheck
```

## 📁 项目结构

```
mysql-mcp-tool/
├── src/
│   ├── index.ts          # 入口文件
│   ├── server.ts         # MCP 服务器实现
│   ├── mysql-client.ts   # MySQL 客户端
│   ├── tools.ts          # MCP 工具定义
│   ├── config.ts         # 配置管理
│   └── types.ts          # 类型定义
├── dist/                 # 编译输出
├── .env.example          # 环境变量示例
├── package.json
├── tsconfig.json
└── README.md
```

## 🐛 故障排除

### 连接失败

1. 检查 MySQL 服务是否运行
2. 验证连接配置（host、port、user、password）
3. 确认 MySQL 用户有远程访问权限

### 权限错误

如果需要执行写操作但收到权限错误：

1. 检查 `MYSQL_ALLOW_WRITE` 是否设置为 `true`
2. 确认 MySQL 用户有相应的权限

### stdio 模式无响应

1. 确保 Claude Desktop 或其他客户端正确配置了 MCP 服务器
2. 检查日志输出是否有错误信息

## 📄 许可证

MIT License
