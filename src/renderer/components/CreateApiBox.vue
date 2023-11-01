<template>
  <FormBox
  :modelValue="props.modelValue"
  @update:modelValue="handleBoxUpdate"
  title="创建新接口"
  btnTitle="创建"
  @submit="handleCreateApi">
    <vi-form-item :rules="[{ rule: /./, info: '接口名不可为空'}]" label="接口名">
    <vi-input name="api_name" v-model="apiName" placeholder="请输入接口名"></vi-input>
    </vi-form-item>
    <vi-form-item label="所属分组">
    <vi-select name="group" v-model="apiGroup" placeholder="请选择分组">
      <vi-option value="none" selected>无</vi-option>
      <vi-option v-for="group of apiStore.apiList.group" :value="group.aid">{{ group.title }}</vi-option>
    </vi-select>
    </vi-form-item>
  </FormBox>
</template>

<script lang="ts" setup>
import FormBox from './FormBox.vue'
import { ViMessage } from 'viog-ui'
import { ref } from 'vue'
import { useApiStore, useProfileStore } from '../store'
import { createApi } from '../network/api'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])
const profileStore = useProfileStore()
const apiStore = useApiStore()

const apiName = ref()
const apiGroup = ref()

function handleCreateApi (res: boolean, getSubmitFeedback: (m: Map<string, string>) => void) {
  if (!res) return
  const { token, uid, pid } = profileStore
  createApi(token, uid, pid, apiName.value, apiGroup.value === 'none' ? null : apiGroup.value).then(val => {
    if (val.code === 200) {
      ViMessage.append('接口创建成功', 2000)
      apiStore.loadApiList()
      emit('update:modelValue', false)
    } else {
      ViMessage.append('接口创建失败，请重试！', 2000)
    }
  })
}

function handleBoxUpdate (val: boolean) {
  emit('update:modelValue', val)
}
</script>

<style lang="less">
</style>