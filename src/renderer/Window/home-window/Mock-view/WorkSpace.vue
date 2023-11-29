<template>
  <div class="neko-workspace">
    <div class="server-run-attention">
      服务启动成功，服务url：127.0.0.1:4439
    </div>
    <vi-breadcrumb class="path-breadcrumb">
      <vi-breadcrumb-item v-for="item of mockStore.pathList" :key="item">{{ item }}</vi-breadcrumb-item>
    </vi-breadcrumb>
    <div class="workspace-content vi-scroll-bar">
      <div class="func-item">
        <vi-select>
          <vi-option>post</vi-option>
          <vi-option>get</vi-option>
        </vi-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMockStore } from '@/renderer/store'
const mockStore = useMockStore()
</script>

<style lang="less" scoped>
.neko-workspace {
  flex: 1;
  height: 100%;
  // padding: 8px 0;
  box-sizing: border-box;

  .server-run-attention {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: var(--vi-green-color3);
    background-color: var(--vi-green-color5);
  }

  .path-breadcrumb {
    padding: 8px 0;
    --vi-background-color-deep: var(--neko-grey-font-color);
  }

  .tab-content {
    width: 100%;
    height: 40px;
    background-color: var(--neko-content-bg-color);
  }

  .workspace-content {
    display: flex;
    width: 100%;
    height: calc(100% - 40px);
    box-sizing: border-box;
    padding: 10px 8px 0 8px;
    flex-direction: column;
    align-items: center;

    .func-item {
      // display: grid;
      width: 80%;
      height: 200px;
      box-shadow: inset 0 0 0 1px var(--neko-white-border-color);
      background-color: var(--neko-bg-color);
      backdrop-filter: blur(5px);
      border-radius: 5px;
      // grid-template-columns: 1fr 1fr;
      // grid-template-rows: 1fr 1fr;
    }
  }
}
</style>