# 动态表单使用指南

## 简介

动态表单组件是一个基于 Vue 3 和 Element Plus 的可复用组件，它允许开发者通过配置来生成各种类型的表单。该组件支持多种输入类型，并可以根据用户的选择动态显示或隐藏表单项。

## 功能特性

1. 支持多种输入类型：
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

2. 条件显示：表单项可以根据其他字段的值动态显示或隐藏

3. 表单验证：支持 Element Plus 的表单验证规则

4. 事件处理：提供表单提交和重置事件

## 使用方法

### 基本用法

```vue
<template>
  <DynamicForm :fields="formFields" @formSubmit="handleFormSubmit" @formReset="handleFormReset" />
</template>

<script setup>
import DynamicForm from '@/components/DynamicForm.vue'

const formFields = ref([
  {
    type: 'input',
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名',
    defaultValue: '',
    rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  },
])

const handleFormSubmit = (data) => {
  console.log('表单数据:', data)
}

const handleFormReset = () => {
  console.log('表单已重置')
}
</script>
```

### 字段配置选项

每个表单字段支持以下配置选项：

| 属性         | 类型   | 必填 | 说明                                      |
| ------------ | ------ | ---- | ----------------------------------------- |
| type         | string | 是   | 字段类型，如 'input', 'select', 'date' 等 |
| label        | string | 是   | 字段标签                                  |
| prop         | string | 是   | 字段属性名，用于表单数据绑定              |
| defaultValue | any    | 否   | 字段默认值                                |
| placeholder  | string | 否   | 占位符文本                                |
| rules        | array  | 否   | 验证规则                                  |
| dependency   | object | 否   | 依赖条件，用于控制字段显示                |

### 依赖条件配置

通过 dependency 属性可以实现字段的条件显示：

```js
{
  type: 'input',
  label: '个人身份证',
  prop: 'idCard',
  dependency: {
    field: 'userType',  // 依赖的字段名
    value: 'individual' // 依赖的字段值
  }
}
```

当 userType 字段的值为 'individual' 时，个人身份证字段才会显示。

### 不同输入类型的配置示例

#### 选择框 (select)

```js
{
  type: 'select',
  label: '用户类型',
  prop: 'userType',
  placeholder: '请选择用户类型',
  defaultValue: '',
  options: [
    { label: '个人用户', value: 'individual' },
    { label: '企业用户', value: 'enterprise' }
  ]
}
```

#### 滑块 (slider)

```js
{
  type: 'slider',
  label: '音量调节',
  prop: 'volume',
  defaultValue: 50,
  min: 0,
  max: 100,
  step: 1,
  showInput: true
}
```

#### 复选框 (checkbox)

```js
{
  type: 'checkbox',
  label: '兴趣爱好',
  prop: 'hobbies',
  defaultValue: [],
  options: [
    { label: '阅读', value: 'reading' },
    { label: '运动', value: 'sports' },
    { label: '音乐', value: 'music' }
  ]
}
```

## 实现原理

### 组件结构

动态表单组件主要由两部分组成：

1. **模板部分**：使用 Element Plus 组件库渲染不同类型的表单控件
2. **脚本部分**：处理字段配置、数据绑定、验证规则和事件处理

### 条件显示实现

条件显示功能通过 Vue 的 `v-if` 指令实现：

```vue
<el-form-item
  v-if="!field.dependency || formData[field.dependency.field] === field.dependency.value"
  :label="field.label"
  :prop="field.prop"
>
  <!-- 表单控件 -->
</el-form-item>
```

### 数据绑定

使用 Vue 的响应式系统实现数据绑定：

```js
const formData = reactive({})
const formRules = reactive({})

// 初始化表单数据
formData[field.prop] = field.defaultValue !== undefined ? field.defaultValue : ''
```

### 表单验证

基于 Element Plus 的表单验证功能实现：

```js
const submitForm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    emit('formSubmit', { ...formData })
  } catch (error) {
    console.log('表单验证失败:', error)
  }
}
```

## 扩展自定义字段类型

要添加新的字段类型，需要：

1. 在模板中添加对应的 Element Plus 组件
2. 在字段配置中添加相应的属性定义
3. 更新文档说明

示例：

```vue
<!-- 在模板中添加新的组件 -->
<el-cascader
  v-else-if="field.type === 'cascader'"
  v-model="formData[field.prop]"
  :options="field.options"
  :placeholder="field.placeholder"
></el-cascader>
```

## 注意事项

1. 确保字段的 `prop` 值唯一，避免数据冲突
2. 依赖字段需要在被依赖字段之前定义
3. 表单验证规则遵循 Element Plus 的验证规则格式
4. 对于数组类型的默认值（如复选框），应使用数组格式 `[]`
