# iFlow 项目上下文 - 动态表单组件

## 项目概述

这是一个基于 Vue 3 和 Element Plus 的动态表单组件项目。该项目实现了一个可复用的动态表单组件，支持多种输入类型和条件显示功能，允许开发者通过配置来生成各种类型的表单。

### 核心特性

1. **多种输入类型支持**：
   - 文本输入框 (input)
   - 选择框 (select)
   - 日期选择器 (date)
   - 日期范围选择器 (daterange)
   - 日期时间选择器 (datetime)
   - 文本域 (textarea)
   - 开关 (switch)
   - 滑块 (slider)
   - 单选框 (radio)
   - 复选框 (checkbox)
   - 评分 (rate)
   - 颜色选择器 (color)

2. **条件显示**：表单项可以根据其他字段的值动态显示或隐藏

3. **表单验证**：集成 Element Plus 的表单验证功能

4. **响应式设计**：适配不同屏幕尺寸

## 项目结构

```
dynamic_form/
├── src/
│   ├── components/
│   │   └── DynamicForm.vue      # 核心动态表单组件
│   ├── views/
│   │   └── HomeView.vue         # 演示页面
│   ├── router/
│   │   └── index.js             # 路由配置
│   ├── App.vue                  # 根组件
│   └── main.js                  # 应用入口
├── docs/
│   ├── dynamic-form-guide.md    # 使用指南
│   └── implementation-details.md# 实现原理解析
├── public/
├── package.json                 # 项目配置和依赖
├── README.md                    # 项目说明
└── IFLOW.md                     # iFlow 上下文文件
```

## 技术栈

- **框架**：Vue 3 (Composition API)
- **UI 库**：Element Plus
- **构建工具**：Vite
- **包管理**：pnpm
- **路由**：vue-router
- **状态管理**：Pinia

## 核心组件

### DynamicForm.vue

这是项目的核心组件，实现了动态表单的主要功能：

1. **模板部分**：
   - 使用 Element Plus 组件渲染不同类型的表单控件
   - 通过 `v-for` 循环渲染字段
   - 通过 `v-if` 实现条件显示

2. **脚本部分**：
   - 使用 Vue 3 Composition API
   - 响应式数据管理 (`reactive`, `ref`)
   - 表单验证集成
   - 事件处理 (`formSubmit`, `formReset`)

3. **关键功能**：
   - 条件显示：根据 `dependency` 属性控制字段显示
   - 数据绑定：使用 `v-model` 实现双向数据绑定
   - 表单验证：集成 Element Plus 验证规则

## 构建和运行

### 开发环境

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 默认访问地址：http://localhost:5173
```

### 生产构建

```bash
# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

### 代码质量

```bash
# 代码检查和修复
pnpm lint

# 代码格式化
pnpm format
```

## 开发约定

### 代码风格

- 遵循 Vue 3 Composition API 风格
- 使用 Element Plus 组件库
- 遵循 ESLint 和 Prettier 的代码规范

### 组件设计

- 组件使用 PascalCase 命名
- 组件属性使用 camelCase 命名
- 组件事件使用 camelCase 命名

### 表单字段配置

字段配置对象支持以下属性：
- `type`: 字段类型
- `label`: 字段标签
- `prop`: 字段属性名
- `defaultValue`: 默认值
- `placeholder`: 占位符文本
- `rules`: 验证规则
- `dependency`: 依赖条件

## 文档资源

- [使用指南](./docs/dynamic-form-guide.md) - 详细介绍如何使用动态表单组件
- [实现原理解析](./docs/implementation-details.md) - 深入解析动态表单的实现原理

## 开发任务示例

如果需要扩展动态表单功能，可以参考以下步骤：

1. 在 `DynamicForm.vue` 的模板中添加新的 Element Plus 组件
2. 在字段配置中添加相应的属性定义
3. 更新文档说明
4. 在 `HomeView.vue` 中添加演示字段
5. 测试新功能

## 注意事项

1. 确保字段的 `prop` 值唯一，避免数据冲突
2. 依赖字段需要在被依赖字段之前定义
3. 表单验证规则遵循 Element Plus 的验证规则格式
4. 对于数组类型的默认值（如复选框），应使用数组格式 `[]`