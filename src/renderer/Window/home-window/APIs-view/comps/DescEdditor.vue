<template>
  <div class="neko-desc-edditor">
    <p class="title">接口描述信息</p>
    <div class="text" contenteditable
    @input="handleInput"
    ref="textarea"
    :v-html="apiStore.apiList.target.desc"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useApiStore } from '@/renderer/store'
const apiStore = useApiStore()

const textarea = ref()

function handleInput () {
  apiStore.addWatingUpdateTab(apiStore.apiList.target.aid)
  apiStore.apiList.target.desc = textarea.value.innerHTML
}
</script>

<style lang="less" scoped>
  .neko-desc-edditor {
    width: 100%;
    padding: 0 10px;
    margin-bottom: 8px;
    box-sizing: border-box;

    .title {
      padding-bottom: 6px;
    }

    .text {
      flex: 1;
      min-height: 1em;
      padding: 6px;
      border: 1px solid var(--neko-white-border-color);
      line-height: 1.4em;
      border-radius: 3px;
      outline: none;
      white-space: pre;
    }
  }
</style>