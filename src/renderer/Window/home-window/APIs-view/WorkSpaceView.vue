<template>
  <div class="neko-apis-workspace">
    <ApiTab/>
    <div class="workspace-content" v-if="apiStore.aid">
      <!-- 发送部分 -->
      <UrlSend/>
      <!-- desc编辑区 -->
      <DescEdditor/>
      <!-- 请求部分 -->
      <div class="workspace-content__request vi-scroll-bar">
        <vi-nav @change="handleNavChange">
          <vi-nav-item>Params</vi-nav-item>
          <vi-nav-item>Authorization</vi-nav-item>
          <vi-nav-item>Headers</vi-nav-item>
          <vi-nav-item>Body</vi-nav-item>
        </vi-nav>
        <div class="nav-content">
          <ParamsContent v-if="navChoose === 0"></ParamsContent>
          <AuthorizationContent v-else-if="navChoose === 1"></AuthorizationContent>
          <HeadersContent v-else-if="navChoose === 2"></HeadersContent>
          <BodyContent v-else></BodyContent>
        </div>
      </div>
      <!-- 响应内容部分 -->
      <vi-flex class="workspace-content__response" horizontal="top" vertical="none" v-if="!apiStore.isBaseOpen">
        <div class="workspace-content__response__title">Response</div>
        <ResponsePart/>
      </vi-flex>
    </div>
    <div class="workspace-content-temp" v-else>
      暂无打开接口
    </div>
  </div>
</template>

<script lang="ts" setup>
import ApiTab from './comps/ApiTab.vue'
import UrlSend from './comps/UrlSend.vue'
import DescEdditor from './comps/DescEdditor.vue'
import ResponsePart from './comps/ResponsePart.vue'
import ParamsContent from './ParamsContent.vue'
import AuthorizationContent from './AuthorizationContent.vue'
import HeadersContent from './HeadersContent.vue'
import BodyContent from './BodyContent.vue'
import { ref } from 'vue'
import { useApiStore, useNetworkStore } from '@/renderer/store'
const apiStore = useApiStore()
const networkStore = useNetworkStore()

const navChoose = ref(0)

function handleNavChange (id: 0) {
  // console.log(id)
  navChoose.value = id
}
</script>

<style lang="less">
  .neko-apis-workspace {
    .vi-select-box  {
      backdrop-filter: blur(20px);
    }
  }
</style>

<style lang="less" scoped>
  .neko-apis-workspace {
    --vi-icon-color: var(--neko-white-border-color);
    --vi-link-color: var(--neko-white-font-color);
    --vi-font-color: var(--neko-white-font-color);
    --vi-background-color-base: transparent;
    --vi-background-color-deep: var(--neko-white-font-color);
    --vi-background-color: var(--neko-white-border-color);
    color: var(--vi-font-color);
    width: 100px;
    height: 100%;
    flex: 1;

    .workspace-content {
      overflow: hidden;
      display: flex;
      width: 100%;
      height: calc(100% - 40px);
      background-color: var(--neko-content-bg-color);
      color: var(--neko-white-border-color);
      flex-direction: column;

      .workspace-content__request {
        width: 100%;
        flex: 1;
        padding: 0 10px;
        box-sizing: border-box;

        .nav-content {
          margin-top: 16px;
          --vi-table-border-color: var(--neko-white-border-color);
        }
      }
      .workspace-content__response {
        display: flex;
        width: 100%;
        --vi-flex-default-height: 100px;
        --vi-flex-min-height: 30px;
        --vi-flex-max-height: 400px;
        --vi-scroll-bar-color: var(--neko-white-bg-color-s);
        --vi-scroll-bar-color-hover: var(--neko-white-bg-color);
        padding: 6px 0;
        background-color: var(--neko-content-bg-color);
        box-shadow: 0 0 10px 0 var(--neko-white-bg-color),
        0 0 0 1px var(--neko-white-bg-color);
        flex-direction: column;
        box-sizing: border-box;
        .workspace-content__response__title {
          width: 100%;
          padding-left: 6px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--neko-white-bg-color);
          color: #fff;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
    .workspace-content-temp {
      display: flex;
      width: 100%;
      height: calc(100% - 40px);
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
  }
</style>