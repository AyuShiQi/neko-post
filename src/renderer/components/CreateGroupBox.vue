<template>
  <FormBox
  :modelValue="props.modelValue"
  @update:modelValue="handleBoxUpdate"
  title="创建新分组"
  btnTitle="创建"
  @submit="handleCreateGroup">
      <vi-form-item :rules="[{ rule: /./, info: '组名不可为空'}]" label="分组名">
      <vi-input name="group_name" v-model="groupName" placeholder="请输入分组名"></vi-input>
      </vi-form-item>
  </FormBox>
</template>

<script lang="ts" setup>
import FormBox from './FormBox.vue'
import { ViMessage } from 'viog-ui'
import { ref } from 'vue'
import { useApiStore, useProfileStore } from '../store'
import { createApiGroup } from '../network/api'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])
const profileStore = useProfileStore()
const apiStore = useApiStore()

const groupName = ref()

function handleCreateGroup (res: boolean, getSubmitFeedback: (m: Map<string, string>) => void) {
  if (!res) return
  const { token, uid, pid } = profileStore
  createApiGroup(token, uid, pid, groupName.value, null).then(val => {
    if (val.code === 200) {
      ViMessage.append('分组创建成功', 2000)
      apiStore.loadGroupList()
      emit('update:modelValue', false)
    } else {
      ViMessage.append('分组创建失败，请重试！', 2000)
    }
  })
}

function handleBoxUpdate (val: boolean) {
  emit('update:modelValue', val)
}
</script>

<style lang="less">
</style>