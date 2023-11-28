<template>
  <FormBox
  class="neko-create-mock"
  :modelValue="props.modelValue"
  @update:modelValue="handleBoxUpdate"
  title="创建新路径"
  btnTitle="创建"
  @submit="handleCreateMock">
    <vi-form-item :rules="[{ rule: /./, info: '路径不可为空'}]" label="path">
      <vi-input name="path" v-model="path" placeholder="请输入路径名"></vi-input>
    </vi-form-item>
    <vi-form-item label="备注">
      <vi-input name="title" v-model="title" placeholder="请输入备注（可选）"></vi-input>
    </vi-form-item>
  </FormBox>
</template>

<script lang="ts" setup>
import FormBox from './FormBox.vue'
import { ViMessage } from 'viog-ui'
import { ref } from 'vue'
import { useApiStore, useMockStore } from '../store'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])
const mockStore = useMockStore()

const path = ref()
const title = ref('')

async function handleCreateMock (res: boolean, getSubmitFeedback: (m: Map<string, string>) => void) {
  if (!res) return

  const val = await mockStore.createMock(title.value, path.value)
  if (val.code === 200) {
    ViMessage.append('路径创建成功', 2000)
    // 更新结果
    mockStore.loadMockList()
    emit('update:modelValue', false)
  } else if (val.code === 501) {
    const feedBackMap = new Map<string, string>()
    feedBackMap.set('path', '该路径已存在')
  } else {
    ViMessage.append('创建失败，请重试！', 2000)
  }
}

function handleBoxUpdate (val: boolean) {
  emit('update:modelValue', val)
}
</script>

<style lang="less" scoped>
.neko-create-mock {
  --neko-width: 400px;
  --neko-height: 280px;
}
</style>