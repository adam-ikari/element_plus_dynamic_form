<template>
  <div class="home">
    <h1>动态表单示例</h1>
    <DynamicForm :fields="formFields" @formSubmit="handleFormSubmit" @formReset="handleFormReset" />

    <div v-if="submittedData" class="result">
      <h2>提交的数据:</h2>
      <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import DynamicForm from '@/components/DynamicForm.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 控制是否显示多国语指南提示
const showI18nGuide = ref(true)

// 基础表单字段配置
const baseFormFields = [
  {
    type: 'input',
    label: t('form.field.username'),
    prop: 'username',
    placeholder: t('form.placeholder.username'),
    defaultValue: '',
    rules: [
      {
        required: true,
        message: t('validation.required', { name: t('form.field.username') }),
        trigger: 'blur',
      },
      { min: 3, max: 15, message: t('validation.length', { min: 3, max: 15 }), trigger: 'blur' },
    ],
  },
  {
    type: 'select',
    label: '用户类型',
    prop: 'userType',
    placeholder: '请选择用户类型',
    defaultValue: '',
    options: [
      { label: '个人用户', value: 'individual' },
      { label: '企业用户', value: 'enterprise' },
    ],
    rules: [{ required: true, message: '请选择用户类型', trigger: 'change' }],
  },
  {
    type: 'input',
    label: '个人身份证',
    prop: 'idCard',
    placeholder: '请输入身份证号码',
    defaultValue: '',
    dependency: {
      field: 'userType',
      value: 'individual',
    },
    rules: [{ required: true, message: '请输入身份证号码', trigger: 'blur' }],
  },
  {
    type: 'input',
    label: '企业名称',
    prop: 'companyName',
    placeholder: '请输入企业名称',
    defaultValue: '',
    dependency: {
      field: 'userType',
      value: 'enterprise',
    },
    rules: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
  },
  {
    type: 'input',
    label: '企业税号',
    prop: 'taxId',
    placeholder: '请输入企业税号',
    defaultValue: '',
    dependency: {
      field: 'userType',
      value: 'enterprise',
    },
    rules: [{ required: true, message: '请输入企业税号', trigger: 'blur' }],
  },
  {
    type: 'select',
    label: '会员等级',
    prop: 'membershipLevel',
    placeholder: '请选择会员等级',
    defaultValue: '',
    options: [
      { label: '普通会员', value: 'basic' },
      { label: '黄金会员', value: 'gold' },
      { label: '钻石会员', value: 'diamond' },
    ],
    rules: [{ required: true, message: '请选择会员等级', trigger: 'change' }],
  },
  {
    type: 'input',
    label: '推荐人',
    prop: 'referrer',
    placeholder: '请输入推荐人姓名',
    defaultValue: '',
    dependency: {
      field: 'membershipLevel',
      value: 'gold',
    },
    rules: [{ required: true, message: '请输入推荐人姓名', trigger: 'blur' }],
  },
  {
    type: 'input',
    label: '专属客服',
    prop: 'dedicatedSupport',
    placeholder: '请输入专属客服工号',
    defaultValue: '',
    dependency: {
      field: 'membershipLevel',
      value: 'diamond',
    },
    rules: [{ required: true, message: '请输入专属客服工号', trigger: 'blur' }],
  },
  // 新增的输入类型演示
  {
    type: 'switch',
    label: '是否启用',
    prop: 'isEnabled',
    defaultValue: true,
    activeText: '启用',
    inactiveText: '禁用',
  },
  {
    type: 'slider',
    label: '音量调节',
    prop: 'volume',
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    showInput: true,
    dependency: {
      field: 'isEnabled',
      value: true,
    },
  },
  {
    type: 'radio',
    label: '性别',
    prop: 'gender',
    defaultValue: 'male',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
      { label: '其他', value: 'other' },
    ],
  },
  {
    type: 'checkbox',
    label: '兴趣爱好',
    prop: 'hobbies',
    defaultValue: [],
    options: [
      { label: '阅读', value: 'reading' },
      { label: '运动', value: 'sports' },
      { label: '音乐', value: 'music' },
      { label: '旅行', value: 'travel' },
    ],
  },
  {
    type: 'rate',
    label: '满意度评分',
    prop: 'satisfaction',
    defaultValue: 0,
    max: 5,
    allowHalf: true,
  },
  {
    type: 'color',
    label: '主题颜色',
    prop: 'themeColor',
    defaultValue: '#409EFF',
  },
  // 日期输入类型演示
  {
    type: 'date',
    label: '出生日期',
    prop: 'birthDate',
    placeholder: '请选择出生日期',
    defaultValue: '',
  },
  {
    type: 'daterange',
    label: '工作时间',
    prop: 'workRange',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    format: 'YYYY-MM-DD',
    valueFormat: 'YYYY-MM-DD',
    defaultValue: [],
  },
  {
    type: 'datetime',
    label: '会议时间',
    prop: 'meetingTime',
    placeholder: '请选择会议时间',
    defaultValue: '',
  },
]

// 表单字段配置
const formFields = ref(baseFormFields)

// 提交的数据
const submittedData = ref(null)

// 处理表单提交
const handleFormSubmit = (data) => {
  submittedData.value = data
  console.log('表单提交数据:', data)
}

// 处理表单重置
const handleFormReset = () => {
  submittedData.value = null
  console.log('表单已重置')
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.result {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #f9fafc;
}

.result h2 {
  margin-top: 0;
}
</style>
