# 法律案例库 - 全球法律案例智能检索系统

一个基于 Vue 3 + Vite + Pinia 构建的现代化法律案例查询和分析系统，提供全球主要司法管辖区的法律案例检索、筛选和分析功能。

## ✨ 功能特性

### 🔍 智能搜索
- 关键词搜索：支持案例名称、内容、标签等多维度搜索
- 高级筛选：按国家/地区、案例类型、年份、法院类型等筛选
- 实时搜索：输入即搜索，提供即时反馈

### 📊 案例管理
- 案例列表：支持网格视图和列表视图切换
- 案例详情：完整的案例信息展示，包括争议焦点、判决结果、相关法律条文
- 分页加载：支持无限滚动和分页加载
- 排序功能：按日期、相关性、引用次数、浏览量排序

### 📈 数据分析
- 统计概览：案例数量、国家分布、类型分布等统计信息
- 趋势分析：案例增长趋势和热门案例分析
- 推荐系统：基于相似度的案例推荐

### 🎨 用户体验
- 响应式设计：完美适配桌面端和移动端
- 现代化UI：基于 TailwindCSS 的美观界面
- 流畅动画：丰富的交互动画和过渡效果
- 无障碍支持：符合 WCAG 标准的无障碍设计

## 🚀 技术栈

### 前端框架
- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Pinia** - Vue 状态管理库

### UI 框架
- **TailwindCSS** - 实用优先的 CSS 框架
- **FontAwesome** - 图标库

### 开发工具
- **ESLint** - 代码质量检查
- **Vue DevTools** - Vue 开发调试工具

## 📦 项目结构

```
src/
├── api/                 # API 接口管理
│   └── index.js        # API 配置和接口定义
├── components/         # Vue 组件
│   ├── Header.vue      # 头部导航组件
│   ├── SearchSection.vue # 搜索区域组件
│   ├── FilterSidebar.vue # 筛选侧边栏组件
│   ├── CaseList.vue    # 案例列表组件
│   ├── CaseDetailModal.vue # 案例详情模态框
│   └── Footer.vue      # 页脚组件
├── stores/             # Pinia 状态管理
│   └── caseStore.js    # 案例相关状态
├── utils/              # 工具函数
│   └── mockAPI.js      # 模拟 API 数据
├── App.vue             # 根组件
└── main.js             # 应用入口
```

## 🛠️ 安装和运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖
```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install
```

### 开发环境运行
```bash
# 使用 npm
npm run dev

# 使用 yarn
yarn dev

# 使用 pnpm
pnpm dev
```

### 生产环境构建
```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 🔧 配置说明

### 环境变量
创建 `.env` 文件配置环境变量：

```env
# API 基础地址
VITE_API_BASE_URL=http://localhost:8080/api

# 应用标题
VITE_APP_TITLE=法律案例库

# 是否启用调试模式
VITE_DEBUG=true
```

### API 配置
在 `src/api/index.js` 中配置 API 接口：

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
```

## 📱 使用指南

### 搜索案例
1. 在搜索框中输入关键词
2. 点击"高级搜索"展开更多筛选选项
3. 选择国家/地区、案例类型、年份等筛选条件
4. 点击"开始搜索"或按回车键执行搜索

### 查看案例详情
1. 在案例列表中点击任意案例卡片
2. 在弹出的详情模态框中查看完整信息
3. 可以下载 PDF 或分享案例

### 筛选案例
1. 在左侧筛选面板中选择筛选条件
2. 支持多选筛选
3. 点击"应用筛选"执行筛选
4. 点击"清除全部"重置筛选条件

## 🎯 开发计划

### 已完成功能
- ✅ 基础项目架构搭建
- ✅ 案例搜索和筛选
- ✅ 案例详情展示
- ✅ 响应式界面设计
- ✅ 模拟 API 数据

### 待开发功能
- 🔄 后端 API 集成
- 🔄 真实数据接入
- 🔄 高级搜索算法
- 🔄 案例推荐系统
- 🔄 数据可视化图表
- 🔄 多语言支持
- 🔄 移动端优化
- 🔄 性能优化

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送分支：`git push origin feature/AmazingFeature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- 项目主页：[GitHub Repository](https://github.com/your-username/legal-case-library)
- 问题反馈：[Issues](https://github.com/your-username/legal-case-library/issues)
- 邮箱：contact@legal-case-library.com

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

---

**注意**：本项目目前使用模拟数据进行演示，实际部署时需要配置真实的后端 API 接口。 