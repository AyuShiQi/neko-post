<template>
  <div class="neko-headers-choose" v-show="!apiStore.isBaseOpen">
    <vi-radio-group v-model="typeValue" @change="handleModeChange">
      <vi-radio value="none"></vi-radio>
      <vi-radio value="form-data"></vi-radio>
      <vi-radio value="x-www-form-urlencoded"></vi-radio>
      <vi-radio value="JSON"></vi-radio>
      <vi-radio value="raw"></vi-radio>
      <vi-radio value="binary"></vi-radio>
    </vi-radio-group>
  </div>
  <vi-input-table
  class="neko-input-table"
  v-show="!apiStore.isBaseOpen"
  extension
  multi
  v-model="inputValue"
  :pickValue="pickValue"
  @pick="handlePickValueChange"
  @input="handleUpdate">
    <vi-input-table-col value="key" style="--vi-table-td-width: 180px"></vi-input-table-col>
    <vi-input-table-col value="value" style="--vi-table-td-width: 280px"></vi-input-table-col>
    <vi-input-table-col value="description" style="--vi-table-td-width: 200px"></vi-input-table-col>
  </vi-input-table>
  <div v-show="apiStore.isBaseOpen">
    暂无内容
  </div>
</template>

<script lang="ts" setup>
import { useApiStore } from '@/renderer/store'
import { ref, computed, watch } from 'vue'
const apiStore = useApiStore()

const typeValue = ref('none')

const inputValue = computed(() => {
  const body = apiStore.apiList.target.body
  if (body instanceof Object) {
    if (!(body.target instanceof Array)) body.target = []
    return body.target
  }
  return []
})

const pickValue = computed(() => {
  const body = apiStore.apiList.target.body
  if (body instanceof Object) {
    if (!(body.pick instanceof Array)) body.pick = []
    return body.pick
  }
  return []
})

const originTypeValue = computed(() => {
  const body = apiStore.apiList.target.body
  if (body instanceof Object) {
    return body.type
  }
  return 'none'
})

watch(originTypeValue, () => {
  typeValue.value = originTypeValue.value
})
/**
 * 添加更新节点
 */
function handleUpdate () {
  apiStore.addWatingUpdateTab(apiStore.aid)
}

function handlePickValueChange () {
  apiStore.addWatingUpdateTab(apiStore.aid)
}

function handleModeChange () {
  const body = apiStore.apiList.target.body
  if (body instanceof Object) {
    body.type = typeValue.value
  }
  handleUpdate()
}
</script>

<style lang="less" scoped>
  .neko-headers-choose {
      white-space: nowrap;
      .vi-radio {
          margin-right: 8px;
      }
  }

  .neko-input-table {
    margin-top: 16px;
    --vi-background-color: var(--neko-content-bg-color);
    --vi-background-color-solid: var(--neko-content-bg-color-solid);
  }
</style>