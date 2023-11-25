<template>
  <div class="neko-workspace-content__send">
    <vi-input
    v-if="apiStore.isBaseOpen"
    v-model="apiStore.apiList.target.url"
    @update:modelValue="handleUpdate"
    type="plain"
    placeholder="请输入基础接口地址"
    class="workspace-content__send-input">
    </vi-input>
    <vi-input
    v-else
    v-model="apiStore.apiList.target.url"
    @update:modelValue="handleUpdate"
    type="plain"
    placeholder="请输入接口地址"
    class="workspace-content__send-input">
      <template v-slot:prefix>
        <vi-select
        v-model="apiStore.apiList.target.method"
        @update:modelValue="handleUpdate"
        class="neko-input-select">
          <vi-option class="get" :value="null">未知</vi-option>
          <vi-option class="get" :value="0">GET</vi-option>
          <vi-option class="put" :value="1">PUT</vi-option>
          <vi-option class="post" :value="2">POST</vi-option>
          <vi-option class="head" :value="3">HEAD</vi-option>
          <vi-option class="patch" :value="4">PATCH</vi-option>
          <vi-option class="delete" :value="5">DELETE</vi-option>
          <vi-option class="options" :value="6">OPTIONS</vi-option>
          <vi-option class="connect" :value="7">CONNECT</vi-option>
        </vi-select>
      </template>
    </vi-input>
    <vi-button class="workspace-content__send-btn" color="purple" @click="sendRequest">Send</vi-button>
  </div>
</template>

<script lang="ts" setup>
import { useApiStore, useNetworkStore } from '@/renderer/store'
import { ViMessage } from 'viog-ui'
const apiStore = useApiStore()
const networkStore = useNetworkStore()

function handleUpdate () {
  apiStore.addWatingUpdateTab(apiStore.aid)
}

async function sendRequest () {
  const saveRes: boolean = await networkStore.sendApi(apiStore.apiList.target, apiStore.apiList.base) as any
  if (saveRes === false) ViMessage.append('最新响应保存失败，历史记录已达最大上限！', 2000)
}
</script>

<style lang="less" scoped>
  .neko-workspace-content__send {
    display: flex;
    height: 60px;
    padding: 10px;
    align-items: center;
    gap: 16px;
    box-sizing: border-box;

    .workspace-content__send-input {
      flex: 1;
      --vi-font-size: 16px;
      --vi-input-width: 100%;
      --vi-input-height: 40px;
      --vi-input-prefix-width: 100px;
      --vi-select-list-width: 120px;
      --vi-icon-color: var(--neko-white-border-color);
      --vi-link-color: var(--neko-white-font-color);
      --vi-background-color-base: transparent;
      --vi-background-color-deep: var(--neko-white-font-color);
      --vi-background-color: var(--neko-white-border-color);
      .neko-input-select {
        .vi-option {
          font-weight: 600;
          --vi-background-color: var(--neko-bg-color);
        }

        .post {
          color: var(--vi-yellow-color1);
        }

        .get {
          color: var(--vi-green-color1);
        }

        .put {
          color: var(--vi-blue-color1);
        }

        .head {
          color: var(--vi-golden-color2);
        }

        .delete {
          color: var(--vi-red-color1);
        }

        .connect {
          color: var(--vi-pink-color1);
        }

        .options {
          color: var(--vi-green-color4);
        }

        .trace {
          color: var(--vi-yellow-color4);
        }

        .patch {
          color: var(--vi-blue-color3);
        }
      }
    }

    .workspace-content__send-btn {
      width: 100px;
      height: 42px;
      font-weight: 600;
      --vi-font-size: 16px;
      --vi-purple-color2: var(--neko-purple-color);
      --vi-purple-color3: var(--vi-purple-color6);
      outline: none;
    }
  }
</style>