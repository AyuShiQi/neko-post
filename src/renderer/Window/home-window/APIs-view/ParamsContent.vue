<template>
    <vi-input-table class="neko-input-table"
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
import { useApiStore } from '@/renderer/store'
import { computed } from 'vue'
const apiStore = useApiStore()

const inputValue = computed(() => {
  const params = apiStore.apiList.target.params
  if (params instanceof Object) {
    if (!(params.target instanceof Array)) params.target = []
    return params.target
  }
  return []
})

const pickValue = computed(() => {
  const params = apiStore.apiList.target.params
  if (params instanceof Object) {
    if (!(params.pick instanceof Array)) params.pick = []
    return params.pick
  }
  return []
})

function handleUpdate () {
  apiStore.addWatingUpdateTab(apiStore.aid)
}

function handlePickValueChange (...args) {
  console.log(...args, pickValue.value)
  apiStore.addWatingUpdateTab(apiStore.aid)
}
</script>

<style lang="less" scoped>
.neko-input-table {
    --vi-background-color: var(--neko-content-bg-color);
    --vi-background-color-solid: var(--neko-content-bg-color-solid);
}
</style>