<template>
  <div class="neko-headers-choose" v-show="!apiStore.isBaseOpen">
    <vi-radio-group>
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
import { computed } from 'vue'
const apiStore = useApiStore()

const inputValue = computed(() => {
  const body = apiStore.apiList.target.body
  return body instanceof Object ? (body as any)?.target : []
})

function handleUpdate () {
  apiStore.addWatingUpdateTab(apiStore.aid)
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