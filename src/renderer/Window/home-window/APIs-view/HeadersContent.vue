<template>
  <vi-input-table
  class="neko-input-table"
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
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useApiStore } from '@/renderer/store'
const apiStore = useApiStore()

const inputValue = computed(() => {
  const headers = apiStore.apiList.target.headers
  if (headers instanceof Object) {
    if (!(headers.target instanceof Array)) headers.target = []
    return headers.target
  }
  return []
})

const pickValue = computed(() => {
  const headers = apiStore.apiList.target.headers
  if (headers instanceof Object) {
    if (!(headers.pick instanceof Array)) headers.pick = []
    return headers.pick
  }
  return []
})

function handleUpdate () {
  apiStore.addWatingUpdateTab(apiStore.aid)
}

function handlePickValueChange () {
  apiStore.addWatingUpdateTab(apiStore.aid)
}
</script>

<style lang="less" scoped>
  .neko-input-table {
    --vi-background-color: var(--neko-content-bg-color);
    --vi-background-color-solid: var(--neko-content-bg-color-solid);
  }
</style>