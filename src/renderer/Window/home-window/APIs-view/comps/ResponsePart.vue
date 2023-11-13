<template>
  <div class="neko-workspace-content__response__content vi-scroll-bar">
    <!-- tab区域 -->
    <div></div>
    <!-- 基础信息展示 -->
    <div class="response-status">
      <div class="status-attention"></div>
      <span>{{ networkStore.nowResponse.status }}</span>
      <span class="color-blue">{{ networkStore.nowResponse.statusText }}</span>
    </div>
    {{ networkStore.nowResponse }}
  </div>
</template>

<script lang="ts" setup>
import { useApiStore, useNetworkStore } from '@/renderer/store'
const apiStore = useApiStore()
const networkStore = useNetworkStore()
</script>

<style lang="less" scoped>
.neko-workspace-content__response__content {
  width: 100%;
  height: 100%;
  padding-top: 8px;
  flex: 1;
  box-sizing: border-box;
  // background-color: #fff;

  .response-status {
    display: flex;
    align-items: center;
    gap: 6px;

    .status-attention {
      width: 1em;
      height: 1em;
      background-color: var(--vi-green-color1);
      border-radius: 50%;
    }

    .color-blue {
      color: var(--vi-blue-color3);
    }
  }
}
</style>