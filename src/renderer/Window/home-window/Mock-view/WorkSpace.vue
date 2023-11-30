<template>
  <div class="neko-workspace">
    <div class="server-run-attention">
      服务启动成功，服务url：127.0.0.1:4439
    </div>
    <vi-breadcrumb class="path-breadcrumb">
      <vi-breadcrumb-item v-for="item of mockStore.pathList" :key="item">{{ item }}</vi-breadcrumb-item>
    </vi-breadcrumb>
    <div class="workspace-content vi-scroll-bar" v-if="mockStore.mockList.target">
      <vi-drag-list v-model="mockStore.mockList.target.option" class="drag-list">
        <template v-slot="{ data }">
          <OptionItem :opt="data"/>
        </template>
      </vi-drag-list>
      <div class="neko-add-opt" @click="addNewOption">
        <svg viewBox="0 0 20 20" class="add-opt">
          <path d="M2 10 L18 10 M10 2 L10 18"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import OptionItem from './OptionItem.vue'
import { reactive } from 'vue'
import { useMockStore } from '@/renderer/store'
const mockStore = useMockStore()

const option = reactive([
  { method: 0, statusCode: 200, response: '你是谁' },
  { method: 1, statusCode: 200, response: '你是谁' }
])

function addNewOption () {
  if (mockStore.mockList.target) {
    (mockStore.mockList.target.option as any[]).push({
      method: 0
    })
  }
}
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
    height: 28px;
    line-height: 28px;
    --vi-background-color-deep: var(--neko-grey-font-color);
  }

  .tab-content {
    width: 100%;
    height: 40px;
    background-color: var(--neko-content-bg-color);
  }

  .workspace-content {
    width: 100%;
    height: calc(100% - 40px);
    box-sizing: border-box;
    // padding: 10px 8px 0 8px;

    .drag-list {
      width: 100%;
      align-items: center; 
    }

    .neko-add-opt {
      display: flex;
      width: 100%;
      // max-width: 200px;
      height: 40px;
      margin-top: 8px;
      box-shadow: inset 0 0 0 1px var(--neko-white-border-color);
      border-radius: 5px;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background-color: var(--neko-bg-color);
      }

      .add-opt {
        width: 30px;
        stroke: #fff;
        stroke-linecap: round;
      }
    }
  }
}
</style>