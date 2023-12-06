<template>
  <div class="neko-resp-item-content"
  :class="{
    'be-fixed': fixed
  }">
    <vi-collapse class="neko-resp-item">
      <template v-slot:title>
        <div class="response-title">
          <div class="response-status">
            <div class="status-attention" :style="{
              backgroundColor: isError(resp.status) ? 'var(--vi-red-color1)' : 'var(--vi-green-color1)'
            }"></div>
            <span class="color-blue">{{ resp.status === -1 ? '' : resp.status }}</span>
            <span class="color-blue">{{ resp.statusText }}</span>
          </div>
          <span>
            {{ formatTime(resp['create_time'] as any as string) }}
          </span>
        </div>
      </template>
      <div class="response-else">
        <ul>
          <li v-for="header of parseJsonStrObj(resp.headers)">
            <span>{{ header[0] }}：</span>
            <span>{{ header[1] }}</span>
          </li>
        </ul>
        <vi-divider style="margin: 4px 0;"/>
        <p class="title">Body</p>
        <div class="big-content">
          {{ resp.body ? JSON.parse(resp.body) : resp.body }}
        </div>
        <vi-divider style="margin: 4px 0;"/>
        <p class="title">请求参数</p>
        <ul>
          <li v-for="data of parseJsonStrObj(resp.request)">
            <span>{{ data[0] }}：</span>
            <span>{{ data[1] }}</span>
          </li>
        </ul>
      </div>
    </vi-collapse>
    <vi-dropdown class="neko-resp-item__dropdown" v-model="listOpen">
      <div class="neko-resp-item__delete">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" version="1.1">
          <path d="M245.578138 574.513776c-46.517453 0-84.362386-37.844933-84.362386-84.362386 0-46.520523 37.844933-84.367503 84.362386-84.367503 46.518476 0 84.36341 37.84698 84.36341 84.367503C329.941548 536.668843 292.096614 574.513776 245.578138 574.513776zM245.578138 446.645526c-23.986297 0-43.500746 19.516496-43.500746 43.50484 0 23.986297 19.514449 43.500746 43.500746 43.500746 23.986297 0 43.50177-19.514449 43.50177-43.500746C289.079908 466.162022 269.564435 446.645526 245.578138 446.645526z"></path><path data-v-f75512dc="" d="M523.411911 574.513776c-46.517453 0-84.362386-37.844933-84.362386-84.362386 0-46.520523 37.844933-84.367503 84.362386-84.367503 46.520523 0 84.367503 37.84698 84.367503 84.367503C607.779414 536.668843 569.932434 574.513776 523.411911 574.513776zM523.411911 446.645526c-23.985274 0-43.500746 19.516496-43.500746 43.50484 0 23.986297 19.514449 43.500746 43.500746 43.500746 23.988344 0 43.505863-19.514449 43.505863-43.500746C566.917774 466.162022 547.401278 446.645526 523.411911 446.645526z"></path><path data-v-f75512dc="" d="M801.246707 574.513776c-46.517453 0-84.362386-37.844933-84.362386-84.362386 0-46.520523 37.844933-84.367503 84.362386-84.367503 46.520523 0 84.367503 37.84698 84.367503 84.367503C885.61421 536.668843 847.76723 574.513776 801.246707 574.513776zM801.246707 446.645526c-23.985274 0-43.500746 19.516496-43.500746 43.50484 0 23.986297 19.514449 43.500746 43.500746 43.500746 23.988344 0 43.505863-19.514449 43.505863-43.500746C844.75257 466.162022 825.235051 446.645526 801.246707 446.645526z"></path>
        </svg>
      </div>
      <template v-slot:content>
        <ul class="neko-resp-item__delete-list">
          <li @click="updateType">{{ fixed ? '解除固定' : '固定'}}</li>
          <li @click="delResponse" v-if="!fixed">删除</li>
        </ul>
      </template>
    </vi-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Resp, RespType } from '@/renderer/network'
import { useNetworkStore } from '@/renderer/store'
const networkStore = useNetworkStore()

const props = defineProps<{
  resp: Resp
}>()

const listOpen = ref(false)
const watingUpdate = ref(false)
const fixed = computed(() => props.resp.type === RespType.fix)

function isError (status: number) {
  const t = String(status)[0]
  return t === '4' || t === '5' || t === '' || t === undefined || status === -1
}

function formatTime (time: string) {
  const date = new Date(time)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const dat = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${date.getFullYear()}.${month}.${dat} ${hours}:${minutes}:${seconds}`
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

async function updateType () {
  listOpen.value = false
  if (watingUpdate.value) return
  watingUpdate.value = true
  const res = await networkStore.updateResponseType(props.resp.rid, props.resp.type === RespType.default? RespType.fix : RespType.default)
  if (res.code === 200) {
    await networkStore.updateResponseList()
  }
  watingUpdate.value = false
}

async function delResponse () {
  listOpen.value = false
  const res = await networkStore.deleteResponse(props.resp.rid)

  if (res.code === 200) {
    networkStore.updateResponseList()
  }
}
</script>

<style lang="less" scoped>
.neko-resp-item {
  --vi-collapse-width: 100%;
  --vi-collapse-border-color: none;
  --vi-collapse-title-padding: .6em 20px .6em 6px;
  --vi-collapse-arrow-color: none;
  --vi-collapse-title-bg-color: var(--vi-purple-color5);
  --vi-collapse-border-color: var(--neko-content-bg-color);

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

  .response-else {
    padding: 0px 6px;
    white-space: pre;

    > ul {
      li {
        line-height: 1.5em;
        span:first-child {
          color: var(--neko-grey-font-color);
          font-weight: 600;
        }

        span:last-child {
          color: var(--neko-font-color);
          line-height: 1.5em;
        }
      }
    }

    .title {
      font-weight: 600;
      padding: 4px 0;
    }

    .big-content {
      white-space: pre;
      line-height: 1.4em;
    } 
  }
}

.neko-resp-item-content {
  position: relative;
  .neko-resp-item__dropdown {
    position: absolute;
    top: 6px;
    right: 6px;
    .neko-resp-item__delete {
      width: 1.2em;
      height: 1.2em;
      border-radius: 50%;
      background-color: var(--neko-bg-color-s);

      svg {
        path {
          fill: var(--vi-blue-color3);
        }
      }
    }
  }

  .neko-resp-item__delete-list {
    position: relative;
    right: calc(80px - 1.2em);
    width: 80px;
    border: 1px solid var(--neko-white-border-color);
    background-color: var(--neko-bg-color);
    border-radius: 5px;
    backdrop-filter: blur(5px);

    > li {
      padding: 6px;

      &:hover {
        background-color: var(--neko-blue-bg-color);
      }
    }
  }
}

.neko-resp-item-content.be-fixed {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-radius: 0 0 10px 0;
    background-color: var(--vi-yellow-color4);
  }
}
</style>