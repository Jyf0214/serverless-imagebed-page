# 随机图床

一个简洁的随机图片站点，支持横图 / 竖图筛选，图片来源支持 txt 链接、服务器本地文件或混合。

[![使用 EdgeOne Pages 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?repository_url=https://github.com/Jyf0214/serverless-imagebed-page)

## 功能

- 全屏随机背景首页
- 随机图片 API，支持自由组合参数
- 图片画廊，分页浏览
- 自动生成图片元数据与缩略图
- 中英文双语切换
- 响应式设计
- WebDAV 图片同步（构建前自动下载）

## 技术栈

- Next.js 16 (App Router + Turbopack)
- Tailwind CSS v4
- motion (Framer Motion)
- lucide-react
- sharp (缩略图生成)
- webdav (WebDAV 客户端)
- Vitest + @testing-library/react

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
├── images/                    # 图片源文件
│   ├── horizontal.txt         # 横图链接（每行一个 URL）
│   └── vertical.txt           # 竖图链接（每行一个 URL）
├── public/images/             # 构建时自动生成
│   ├── horizontal.all.txt     # 横图合并
│   ├── vertical.all.txt       # 竖图合并
│   └── thumbs/                # 缩略图（13 种尺寸）
├── src/
│   ├── app/
│   │   ├── page.tsx           # 首页
│   │   ├── gallery/           # 图片画廊
│   │   └── api/
│   │       ├── random/        # 随机图片 API
│   │       └── docs/          # API 文档
│   ├── components/
│   └── i18n/                  # 国际化
├── scripts/
│   ├── sync-webdav.mjs        # WebDAV 图片同步
│   ├── generate-metadata.mjs  # 元数据生成
│   └── generate-thumbs.mjs    # 缩略图生成
├── .git/hooks/
│   ├── pre-commit             # 提交前 ESLint 检查
│   └── pre-push               # 推送前运行测试
└── edgeone.json               # EdgeOne 缓存配置
```

## 添加图片

### WebDAV 自动同步（推荐）

配置环境变量后，构建时会自动从 WebDAV 服务器下载图片到 `images/` 目录：

```bash
WEBDAV_URL=https://your-server.com/dav \
WEBDAV_USER=admin \
WEBDAV_PASS=xxx \
WEBDAV_DIR=/ \
npm run build
```

| 环境变量 | 说明 | 默认值 |
|----------|------|--------|
| `WEBDAV_URL` | WebDAV 服务器地址 | （必填） |
| `WEBDAV_USER` | 用户名 | （必填） |
| `WEBDAV_PASS` | 密码 | （必填） |
| `WEBDAV_DIR` | 远程图片目录 | `/` |

支持增量下载，只同步新增的图片，跳过已存在的文件。

#### Koofr 配置示例

```bash
WEBDAV_URL=https://app.koofr.net/dav/ \
WEBDAV_USER=your-email@example.com \
WEBDAV_PASS=your-password \
WEBDAV_DIR=/Koofr/images \
npm run build
```

### 链接方式

编辑 `images/` 下的 txt 文件，每行一个 URL：

```bash
echo "https://example.com/photo.jpg" >> images/horizontal.txt
```

### 服务器文件

将图片放入 `images/` 目录，构建时自动检测横竖屏并归类。

支持格式：`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.bmp`, `.tiff`

## API

### 随机图片

```
GET /api/random
```

| 参数 | 可选值 | 说明 |
|------|--------|------|
| `orientation` | `h` / `v` / 不传 | 横图 / 竖图 / 随机 |
| `source` | `link` / `file` / `all` | txt 链接 / 服务器文件 / 混合 |
| `mode` | `inline` / `redirect` / `image` | JSON / 302 重定向 / 图片二进制 |

### 快捷路径

```
GET /api/random/image
```

直接返回随机图片二进制，可用作 `<img src="...">`。

## 部署到 EdgeOne Makers

### 安装 CLI

```bash
npm install -g @edgeone/cli
edgeone login
```

### 创建项目

```bash
edgeone makers create -n imagebed
```

### 部署

```bash
edgeone makers deploy -n imagebed
```

CLI 会自动执行构建并上传。

### 使用 API Token 部署

```bash
edgeone makers deploy -n imagebed -t "<your-api-token>"
```

API Token 在 EdgeOne 控制台 → 项目设置 → API Token 中获取。

## 构建命令

```bash
npm run build       # 完整构建（含 WebDAV 同步）
npm run sync        # 仅同步 WebDAV 图片
npm run metadata    # 仅生成元数据
npm run thumbs      # 仅生成缩略图
npm run lint        # ESLint 检查
npm run test        # 运行测试
```

## License

Apache License 2.0
