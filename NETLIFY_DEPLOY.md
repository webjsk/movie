# Netlify 部署配置指南

## 🔧 环境变量配置

在 Netlify 部署时，需要在 Netlify 控制台配置以下环境变量：

### 必需的环境变量

1. **TMDB_API_KEY**
   - 描述：TMDB API 密钥
   - 获取方式：访问 https://www.themoviedb.org/settings/api
   - 示例：`abc123def456ghi789`

2. **NUXT_PUBLIC_TMDB_API_BASE_URL**
   - 描述：TMDB API 基础 URL
   - 默认值：`https://api.themoviedb.org/3`
   - 通常不需要修改

### 可选的环境变量

3. **NUXT_PUBLIC_ENV**
   - 描述：环境标识
   - 可选值：`development` | `production` | `staging`
   - 默认值：`production`

4. **NUXT_PUBLIC_APP_NAME**
   - 描述：应用名称
   - 默认值：`电影网站`

5. **NUXT_PUBLIC_API_BASE_URL**
   - 描述：后端 API 地址（如果有自己的后端）
   - 默认值：空

6. **NUXT_PUBLIC_CDN_URL**
   - 描述：CDN 地址（如果有）
   - 默认值：空

7. **NUXT_PUBLIC_ENABLE_DEBUG**
   - 描述：调试开关
   - 可选值：`true` | `false`
   - 默认值：`false`（生产环境建议关闭）

## 📝 在 Netlify 中配置环境变量

1. 登录 Netlify 控制台
2. 选择你的站点
3. 进入 **Site settings** → **Environment variables**
4. 点击 **Add a variable** 添加上述环境变量
5. 保存后重新部署

## ⚠️ 注意事项

- **TMDB_API_KEY** 是必需的，没有它 API 请求会失败
- 所有 `NUXT_PUBLIC_*` 前缀的变量会在客户端暴露，不要放敏感信息
- 修改环境变量后需要重新部署才能生效

## 🐛 常见问题

### 问题：页面显示 "[nuxt] instance unavailable"

**原因**：环境变量未正确配置

**解决方案**：
1. 检查 Netlify 环境变量是否已设置
2. 确保 `TMDB_API_KEY` 已配置
3. 重新部署站点

### 问题：API 请求失败

**原因**：`TMDB_API_KEY` 未设置或无效

**解决方案**：
1. 检查 `TMDB_API_KEY` 是否正确
2. 验证 API Key 是否有效：访问 https://www.themoviedb.org/settings/api
3. 确保 API Key 有足够的权限

