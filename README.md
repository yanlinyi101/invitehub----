</div>

# InviteHub

一个基于 AI Studio 构建的智能邀请管理应用，使用 TypeScript 开发，支持 Cloudflare 边缘部署。

## 功能特性

- 集成 Gemini AI 能力
- 智能邀请管理
- D1 数据库支持
- 边缘计算，全球加速

## 技术栈

- TypeScript / JavaScript
- Vite 构建工具
- Cloudflare Workers / Pages
- Cloudflare D1 数据库

## 本地运行

**前置要求:** Node.js

```bash
# 安装依赖
npm install

# 配置环境变量
# 在 .env.local 中设置 GEMINI_API_KEY 为你的 Gemini API 密钥

# 启动开发服务器
npm run dev
```

## Cloudflare 部署指南

### 1. 准备工作

- 注册 [Cloudflare 账户](https://dash.cloudflare.com/sign-up)
- 安装 Wrangler CLI：
  ```bash
  npm install -g wrangler
  ```
- 登录 Cloudflare：
  ```bash
  wrangler login
  ```

### 2. 创建 D1 数据库

```bash
# 创建数据库
wrangler d1 create invitehub-db

# 初始化数据库结构
wrangler d1 execute invitehub-db --file=schema.sql
```

### 3. 配置 wrangler.toml

确保 `wrangler.toml` 中的数据库绑定配置正确：

```toml
[[d1_databases]]
binding = "DB"
database_name = "invitehub-db"
database_id = "<your-database-id>"
```

将 `<your-database-id>` 替换为步骤 2 中创建数据库时返回的 ID。

### 4. 设置环境变量

```bash
# 设置 Gemini API 密钥
wrangler secret put GEMINI_API_KEY
```

### 5. 部署到 Cloudflare

```bash
# 构建并部署
npm run deploy

# 或直接使用 wrangler
wrangler deploy
```

部署成功后，你将获得一个 `*.workers.dev` 域名，也可以在 Cloudflare 控制台绑定自定义域名。

## 相关链接

- [AI Studio 应用](https://ai.studio/apps/drive/1ZTPKwCNCu053XR6f6ff_1_kPDCTzSFqq)
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 文档](https://developers.cloudflare.com/d1/)

## 许可证

MIT
