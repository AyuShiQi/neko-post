<template>
  <div class="neko-workspace-content__response__content vi-scroll-bar">
    <!-- tab区域 -->
    <vi-nav class="nav-content" v-model="navPick">
      <vi-nav-item>Current</vi-nav-item>
      <vi-nav-item>History</vi-nav-item>
    </vi-nav>
    <!-- 基础信息展示 -->
    <div class="response-content" v-show="navPick === 0" v-if="networkStore.nowResponse">
      <div class="response-status">
        <div class="status-attention" :style="{
          backgroundColor: networkStore.isError ? 'var(--vi-red-color1)' : 'var(--vi-green-color1)'
        }"></div>
        <span class="color-blue">{{ networkStore.nowResponse.status }}</span>
        <span class="color-blue">{{ networkStore.nowResponse.statusText }}</span>
      </div>
      <vi-collapse title="响应标头 headers">
        <div v-for="item of networkStore.nowResponse?.headers" class="response-item body-view">
          <span>{{ item[0] }}：</span>
          <span>{{ item[1] }}</span>
        </div>
      </vi-collapse>
      <vi-collapse title="响应体 data">
        <div class="body-view">
          {{ networkStore.nowResponse?.data }}
        </div>
      </vi-collapse>
      <vi-collapse title="请求参数 request">
        <div class="body-view">
          <div v-for="item of networkStore.nowResponse?.config?.headers" class="response-item">
            <span>{{ item[0] }}：</span>
            <span>{{ item[1] }}</span>
          </div>
          <vi-divider style="margin: 4px 0;"/>
          <div class="response-item" v-for="item of ['method', 'url', 'params', 'data']">
            <span>{{ item }}：</span>
            <span>{{ networkStore.nowResponse?.config?.[item] }}</span>
          </div>
        </div>
      </vi-collapse>
    </div>
    <div v-show="navPick === 0" v-else class="response_content_none">
      暂无响应内容
    </div>
    <vi-collapse-group v-show="navPick === 1" class="response-content__list" accordion>
      <vi-collapse v-for="item of networkStore.repsList">
        <template v-slot:title>
          <div class="response-title">
            <div class="response-status">
              <div class="status-attention" :style="{
                backgroundColor: isError(item.status) ? 'var(--vi-red-color1)' : 'var(--vi-green-color1)'
              }"></div>
              <span class="color-blue">{{ item.status }}</span>
              <span class="color-blue">{{ item.statusText }}</span>
            </div>
            <span>
              {{ formatTime(item['create_time']) }}
            </span>
          </div>
        </template>
        <div class="response-else">
          <ul>
            <li v-for="header of parseJsonStrObj(item.headers)">
              {{ header[0] }}：{{ header[1] }}
            </li>
          </ul>
          <vi-divider/>
          <!-- <dd>
            <dt>Body</dt>
            <dd v-for="data of parseJsonStrObj(item.body)">
              <span>{{ data[0] }}：</span>
              <span>{{ data[1] }}</span>
            </dd>
          </dd> -->
          <dd>
            <dt>请求参数</dt>
            <dd v-for="data of parseJsonStrObj(item.request)">
              <span>{{ data[0] }}：</span>
              <span>{{ data[1] }}</span>
            </dd>
          </dd>
        </div>
        {{ item }}
      </vi-collapse>
    </vi-collapse-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNetworkStore } from '@/renderer/store'
// const apiStore = useApiStore()
const networkStore = useNetworkStore()

const navPick = ref(0)
// function parseJsonMode (obj: any, preSpace = 4) {
//   console.log(obj, typeof obj)
//   if (typeof obj !== 'object') return obj
//   const res = [] as string[]
//   parseMode(obj, 0)
//   return res.reduce((pre, now) => {
//     return pre + '\n' + now
//   }, '')

//   function parseMode (target: any, step: number, pre = '') {
//     const type = typeof target
//     if (['string', 'boolean', 'boolean', 'null', 'undefined'].includes(type))
//       return `${' '.repeat(step)}${pre}${target}`
//     else if (type === 'object') {
//       // 进入深度遍历
//       if (target instanceof Array) {
//         let tstr = ''
//         if (tstr.length !== 0) {
//           tstr += target[0]
//           for (let i = 1; i < target.length; i++) {
//            tstr += `, ${target[i]}`
//           }
//         }
//         res.push(`${' '.repeat(step)}${pre}[${tstr}]`)
//       } else {
//         res.push(`${' '.repeat(step)}${pre}{`);
//         for (const name in target) {
//           res.push(parseMode(target[name], step + preSpace, name + '：'))
//         }
//         res.push(`${' '.repeat(step)}}`)
//       }
//     }
//     return `${' '.repeat(step)}${pre}undefined`
//   }
// }
function isError (status: number) {
  const t = String(status)[0]
  return t === '4' || t === '5' || t === '' || t === undefined
}

function formatTime (time: string) {
  const date = new Date(time)
  return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

function* parseJsonStrObj(json_str: string) {
  const obj = JSON.parse(json_str)
  if (typeof obj !== 'object') yield ['', obj]
  else {
    for (const item in obj) {
      yield [item, obj[item]]
    }
  }
}
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
    padding: 0 6px;
    margin-bottom: 8px;
  }

  .response-content {
    --vi-collapse-width: 100%;
    --vi-collapse-border-color: none;
    --vi-collapse-title-pdding: .6em 6px;
    --vi-collapse-border-color: var(--vi-purple-color6);
    --vi-collapse-title-bg-color: var(--vi-purple-color5);
    .response-status {
      display: flex;
      padding: 4px 6px;
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
        font-weight: 600;
        color: var(--vi-blue-color3);
      }
    }

    .response-item {
      padding: 4px 0;
      white-space: pre;
      span:first-child {
        color: var(--neko-grey-font-color);
        font-weight: 600;
      }

      span:last-child {
        color: var(--neko-font-color);
      }
    }

    .body-view {
      padding: 0 6px;
      white-space: pre;
      line-height: 1.5em;
    }
  }

  .response_content_none {
    padding: 6px;
  }

  .response-content__list {
    --vi-collapse-width: 100%;
    --vi-collapse-border-color: none;
    --vi-collapse-title-pdding: .6em 20px .6em 6px;
    --vi-collapse-arrow-color: none;
    --vi-collapse-border-color: var(--neko-blue-color);
    --vi-collapse-title-bg-color: var(--neko-blue-bg-color);

    .response-title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .response-status {
        display: flex;
        gap: 8px;
        .status-attention {
          width: 1em;
          height: 1em;
          border-radius: 50%;
        }

        .color-blue {
          color: var(--vi-blue-color3);
        }
      }
    }
  }
}
</style>