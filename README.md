# 动态表单组件 (Dynamic Form)

本项目实现了一个基于 Vue 3 和 Element Plus 的动态表单组件，支持多种输入类型和条件显示功能。

## 演示功能

- 多种输入类型支持（文本框、选择框、日期选择器、开关、滑块等）
- 条件显示（根据下拉菜单选择显示不同字段）
- 表单验证
- 响应式设计
- 多国语支持（基于 vue-i18n 库实现）

## 文档

- [使用指南](./docs/dynamic-form-guide.md) - 详细介绍如何使用动态表单组件
- [实现原理解析](./docs/implementation-details.md) - 深入解析动态表单的实现原理
- [多国语实践指南](./src/views/I18nGuide.vue) - 了解如何实现非侵入式国际化
- [多国语演示页面](./src/views/I18nDemo.vue) - 实际的多国语演示页面

## 推荐 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (并禁用 Vetur)。

## 自定义配置

查看 [Vite 配置参考](https://vite.dev/config/)。

## 项目设置

```sh
pnpm install
```

### 编译和热重载以进行开发

```sh
pnpm dev
```

### 编译和压缩以用于生产

```sh
pnpm build
```

### 使用 [ESLint](https://eslint.org/) 进行代码检查

```sh
pnpm lint
```
