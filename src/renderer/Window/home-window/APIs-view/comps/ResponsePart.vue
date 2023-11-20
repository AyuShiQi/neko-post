<template>
  <div class="neko-workspace-content__response__content vi-scroll-bar">
    <!-- tab区域 -->
    <vi-nav class="nav-content" v-model="navPick">
      <vi-nav-item>current</vi-nav-item>
      <vi-nav-item>history</vi-nav-item>
    </vi-nav>
    <!-- 基础信息展示 -->
    <div class="response-content" v-show="navPick === 0" v-if="networkStore.nowResponse">
      <div class="response-status">
        <div class="status-attention"></div>
        <span>{{ networkStore.nowResponse.status }}</span>
        <span class="color-blue">{{ networkStore.nowResponse.statusText }}</span>
      </div>
      <vi-collapse title="响应标头 headers"></vi-collapse>
        <div v-for="item of networkStore.nowResponse?.headers" class="response-item">
          <span>{{ item[0] }}：</span>
          <span>{{ item[1] }}</span>
        </div>
      </vi-collapse>
      <vi-collapse title="响应体 data" class="body-view">
        {{ networkStore.nowResponse?.data }}
      </vi-collapse>
      <vi-collapse title="请求参数 request" class="body-view">
        <div v-for="item of networkStore.nowResponse?.config?.headers" class="response-item">
          <span>{{ item[0] }}：</span>
          <span>{{ item[1] }}</span>
        </div>
        <vi-divider style="margin: 4px 0;"/>
        <div class="response-item" v-for="item of ['method', 'url', 'params', 'data']">
          <span>{{ item }}：</span>
          <span>{{ networkStore.nowResponse?.config?.[item] }}</span>
        </div>
      </vi-collapse>
    </div>
    <div v-show="navPick === 0" v-else>
      暂无响应内容
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useApiStore, useNetworkStore } from '@/renderer/store'
const apiStore = useApiStore()
const networkStore = useNetworkStore()

const navPick = ref(0)
// function parseJsonMode (obj: string | object) {
//   const res = [] as string[]
//   parseMode(obj, 0)
//   console.log(res)
//   return res.reduce((pre, now) => {
//     return pre + '\n' + now
//   })

//   function parseMode (target: any, step: number, pre: string = '') {
//     const type = typeof target
//     if (['string', 'boolean', 'boolean', 'null', 'undefined'].includes(type)) return `${' '.repeat(step)}${pre}${target}`
//     else if (type === 'object') {
//       // 进入深度遍历
//       res.push(`${' '.repeat(step)}${pre}{`);
//       for (const name in target) {
//         res.push(parseMode(target[name], step + 2, name + '：'))
//       }
//       res.push(`${' '.repeat(step)}}`)
//     }
//     return `${' '.repeat(step)}${pre}undefined`
//   }
// }
</script>

<style lang="less" scoped>
.neko-workspace-content__response__content {
  width: 100%;
  height: 100%;
  padding-top: 8px;
  flex: 1;
  box-sizing: border-box;
  // background-color: #fff;

  .nav-content {
    margin-bottom: 8px;
  }

  .response-content {
    --vi-collapse-width: 100%;
    .response-status {
      display: flex;
      margin-bottom: 8px;
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

    .response-item {
      padding: 4px 0;
      span:first-child {
        color: var(--neko-grey-font-color);
        font-weight: 600;
      }

      span:last-child {
        color: var(--neko-font-color);
      }
    }

    .body-view {
      white-space: pre;
      line-height: 1.5em;
    }
  }
}
</style>