<template>
  <div class="i18n-demo">
    <h1>{{ $t('i18n.demo.title') }}</h1>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>{{ $t('i18n.demo.formDemo') }}</span>
            </div>
          </template>
          
          <DynamicForm 
            :fields="formFields" 
            @formSubmit="handleFormSubmit" 
            @formReset="handleFormReset"
          />
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>{{ $t('i18n.demo.submittedData') }}</span>
            </div>
          </template>
          
          <div v-if="submittedData" class="result">
            <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
          </div>
          <div v-else>
            <p>{{ $t('i18n.demo.noData') }}</p>
          </div>
        </el-card>
        
        <el-card style="margin-top: 20px;">
          <template #header>
            <div class="card-header">
              <span>{{ $t('i18n.demo.languageSwitch') }}</span>
            </div>
          </template>
          
          <div class="language-selector">
            <el-button 
              :type="$i18n.locale === 'zh-CN' ? 'primary' : 'default'"
              @click="switchLanguage('zh-CN')"
            >
              {{ $t('i18n.demo.chinese') }}
            </el-button>
            <el-button 
              :type="$i18n.locale === 'en-US' ? 'primary' : 'default'"
              @click="switchLanguage('en-US')"
              style="margin-left: 10px;"
            >
              {{ $t('i18n.demo.english') }}
            </el-button>
          </div>
          
          <div style="margin-top: 20px;">
            <p>{{ $t('i18n.demo.currentLanguage') }}: {{ $i18n.locale === 'zh-CN' ? $t('i18n.demo.chinese') : $t('i18n.demo.english') }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DynamicForm from '@/components/DynamicForm.vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// 切换语言
const switchLanguage = (newLocale) => {
  locale.value = newLocale
}

// 表单字段配置（使用翻译函数）
const formFields = computed(() => [
  {
    type: 'input',
    label: t('form.field.username'),
    prop: 'username',
    placeholder: t('form.placeholder.username'),
    defaultValue: '',
    rules: [
      { required: true, message: t('validation.required', { name: t('form.field.username') }), trigger: 'blur' },
      { min: 3, max: 15, message: t('validation.length', { min: 3, max: 15 }), trigger: 'blur' },
    ],
  },
  {
    type: 'select',
    label: t('form.field.userType'),
    prop: 'userType',
    placeholder: t('form.placeholder.userType'),
    defaultValue: '',
    options: [
      { label: t('user.type.individual'), value: 'individual' },
      { label: t('user.type.enterprise'), value: 'enterprise' },
    ],
    rules: [{ required: true, message: t('validation.required', { name: t('form.field.userType') }), trigger: 'change' }],
  },
  {
    type: 'input',
    label: t('form.field.idCard'),
    prop: 'idCard',
    placeholder: t('form.placeholder.idCard'),
    defaultValue: '',
    dependency: {
      field: 'userType',
      value: 'individual',
    },
    rules: [{ required: true, message: t('validation.required', { name: t('form.field.idCard') }), trigger: 'blur' }],
  },
  {
    type: 'input',
    label: t('form.field.companyName'),
    prop: 'companyName',
    placeholder: t('form.placeholder.companyName'),
    defaultValue: '',
    dependency: {
      field: 'userType',
      value: 'enterprise',
    },
    rules: [{ required: true, message: t('validation.required', { name: t('form.field.companyName') }), trigger: 'blur' }],
  },
  {
    type: 'select',
    label: t('form.field.membershipLevel'),
    prop: 'membershipLevel',
    placeholder: t('form.placeholder.membershipLevel'),
    defaultValue: '',
    options: [
      { label: t('membership.level.basic'), value: 'basic' },
      { label: t('membership.level.gold'), value: 'gold' },
      { label: t('membership.level.diamond'), value: 'diamond' },
    ],
    rules: [{ required: true, message: t('validation.required', { name: t('form.field.membershipLevel') }), trigger: 'change' }],
  },
  {
    type: 'switch',
    label: t('form.field.isEnabled'),
    prop: 'isEnabled',
    defaultValue: true,
    activeText: t('i18n.demo.enabled'),
    inactiveText: t('i18n.demo.disabled'),
  },
  {
    type: 'radio',
    label: t('form.field.gender'),
    prop: 'gender',
    defaultValue: 'male',
    options: [
      { label: t('gender.male'), value: 'male' },
      { label: t('gender.female'), value: 'female' },
      { label: t('gender.other'), value: 'other' },
    ],
  },
  {
    type: 'checkbox',
    label: t('form.field.hobbies'),
    prop: 'hobbies',
    defaultValue: [],
    options: [
      { label: t('hobbies.reading'), value: 'reading' },
      { label: t('hobbies.sports'), value: 'sports' },
      { label: t('hobbies.music'), value: 'music' },
      { label: t('hobbies.travel'), value: 'travel' },
    ],
  }
])

// 提交的数据
const submittedData = ref(null)

// 处理表单提交
const handleFormSubmit = (data) => {
  submittedData.value = data
  console.log(t('i18n.demo.formSubmitted'), data)
}

// 处理表单重置
const handleFormReset = () => {
  submittedData.value = null
  console.log(t('i18n.demo.formReset'))
}
</script>

<style scoped>
.i18n-demo {
  padding: 20px;
}

.card-header {
  font-weight: bold;
}

.result {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
}

.language-selector {
  display: flex;
  align-items: center;
}
</style>