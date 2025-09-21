<template>
  <el-form
    :model="formData"
    :rules="formRules"
    ref="formRef"
    label-width="100px"
  >
    <template v-for="field in formFields" :key="field.prop">
      <!-- 条件显示：根据依赖字段的值决定是否显示 -->
      <el-form-item
        v-if="!field.dependency || formData[field.dependency.field] === field.dependency.value"
        :label="field.label"
        :prop="field.prop"
      >
        <!-- 输入框 -->
        <el-input
          v-if="field.type === 'input'"
          v-model="formData[field.prop]"
          :placeholder="field.placeholder"
        ></el-input>

        <!-- 选择框 -->
        <el-select
          v-else-if="field.type === 'select'"
          v-model="formData[field.prop]"
          :placeholder="field.placeholder"
        >
          <el-option
            v-for="option in field.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>

        <!-- 日期选择器 -->
        <el-date-picker
          v-else-if="field.type === 'date'"
          v-model="formData[field.prop]"
          type="date"
          :placeholder="field.placeholder"
        ></el-date-picker>

        <!-- 日期范围选择器 -->
        <el-date-picker
          v-else-if="field.type === 'daterange'"
          v-model="formData[field.prop]"
          type="daterange"
          :start-placeholder="field.startPlaceholder"
          :end-placeholder="field.endPlaceholder"
          :format="field.format || 'YYYY-MM-DD'"
          :value-format="field.valueFormat || 'YYYY-MM-DD'"
        ></el-date-picker>

        <!-- 日期时间选择器 -->
        <el-date-picker
          v-else-if="field.type === 'datetime'"
          v-model="formData[field.prop]"
          type="datetime"
          :placeholder="field.placeholder"
        ></el-date-picker>

        <!-- 文本域 -->
        <el-input
          v-else-if="field.type === 'textarea'"
          v-model="formData[field.prop]"
          type="textarea"
          :placeholder="field.placeholder"
        ></el-input>

        <!-- 开关 -->
        <el-switch
          v-else-if="field.type === 'switch'"
          v-model="formData[field.prop]"
          :active-text="field.activeText"
          :inactive-text="field.inactiveText"
        ></el-switch>

        <!-- 滑块 -->
        <el-slider
          v-else-if="field.type === 'slider'"
          v-model="formData[field.prop]"
          :min="field.min || 0"
          :max="field.max || 100"
          :step="field.step || 1"
          :show-input="field.showInput || false"
        ></el-slider>

        <!-- 单选框 -->
        <el-radio-group
          v-else-if="field.type === 'radio'"
          v-model="formData[field.prop]"
        >
          <el-radio
            v-for="option in field.options"
            :key="option.value"
            :label="option.value"
          >
            {{ option.label }}
          </el-radio>
        </el-radio-group>

        <!-- 复选框 -->
        <el-checkbox-group
          v-else-if="field.type === 'checkbox'"
          v-model="formData[field.prop]"
        >
          <el-checkbox
            v-for="option in field.options"
            :key="option.value"
            :label="option.value"
          >
            {{ option.label }}
          </el-checkbox>
        </el-checkbox-group>

        <!-- 评分 -->
        <el-rate
          v-else-if="field.type === 'rate'"
          v-model="formData[field.prop]"
          :max="field.max || 5"
          :allow-half="field.allowHalf || false"
        ></el-rate>

        <!-- 颜色选择器 -->
        <el-color-picker
          v-else-if="field.type === 'color'"
          v-model="formData[field.prop]"
        ></el-color-picker>
      </el-form-item>
    </template>

    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, watch } from 'vue'

// 定义属性
const props = defineProps({
  fields: {
    type: Array,
    required: true
  }
})

// 定义事件
const emit = defineEmits(['formSubmit', 'formReset'])

// 表单引用
const formRef = ref()

// 表单数据
const formData = reactive({})

// 表单规则
const formRules = reactive({})

// 处理字段配置
const formFields = ref(props.fields)

// 初始化表单数据和规则
const initializeForm = () => {
  // 清空现有数据
  Object.keys(formData).forEach(key => {
    delete formData[key]
  })
  
  Object.keys(formRules).forEach(key => {
    delete formRules[key]
  })
  
  // 重新处理字段配置
  formFields.value = props.fields.map(field => {
    // 初始化表单数据
    formData[field.prop] = field.defaultValue !== undefined ? field.defaultValue : ''
    
    // 初始化验证规则
    if (field.rules) {
      formRules[field.prop] = field.rules
    }
    
    return field
  })
}

// 初始化表单
initializeForm()

// 监听字段变化，重新初始化表单
watch(
  () => props.fields,
  () => {
    initializeForm()
  },
  { deep: true }
)

// 监听表单数据变化，处理依赖字段
watch(
  () => formData,
  () => {
    // 当表单数据变化时，可以在这里添加其他逻辑
  },
  { deep: true }
)

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    emit('formSubmit', { ...formData })
  } catch (error) {
    console.log('表单验证失败:', error)
  }
}

// 重置表单
const resetForm = () => {
  formRef.value?.resetFields()
  // 重新初始化表单数据
  initializeForm()
  emit('formReset')
}
</script>