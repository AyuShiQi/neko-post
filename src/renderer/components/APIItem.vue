<template>
  <div class="neko-api-item"
  :class="[
    {
      'neko-api-item-wating-update': apiStore.isWatingUpdate(props.api?.aid),
      'neko-api-item-focus': apiStore.aid === props.api?.aid,
      'neko-api-item_contenteditable-focus': contenteditable
    }
  ]">
    <p
    class="neko-api-item__methods"
    :class="[
      `neko-api-item__methods-${method ?? 'unknown'}`
    ]">{{ method ?? '未知' }}</p>
    <p class="neko-api-item__title"
    ref="contenteditableTitle"
    @blur="saveApiTitle"
    :contenteditable="contenteditable">
      {{ props.api?.title }}
    </p>
    <vi-dropdown v-model="optionListOpen">
      <div class="neko-api-item__delete">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" version="1.1"><path d="M245.578138 574.513776c-46.517453 0-84.362386-37.844933-84.362386-84.362386 0-46.520523 37.844933-84.367503 84.362386-84.367503 46.518476 0 84.36341 37.84698 84.36341 84.367503C329.941548 536.668843 292.096614 574.513776 245.578138 574.513776zM245.578138 446.645526c-23.986297 0-43.500746 19.516496-43.500746 43.50484 0 23.986297 19.514449 43.500746 43.500746 43.500746 23.986297 0 43.50177-19.514449 43.50177-43.500746C289.079908 466.162022 269.564435 446.645526 245.578138 446.645526z"/><path d="M523.411911 574.513776c-46.517453 0-84.362386-37.844933-84.362386-84.362386 0-46.520523 37.844933-84.367503 84.362386-84.367503 46.520523 0 84.367503 37.84698 84.367503 84.367503C607.779414 536.668843 569.932434 574.513776 523.411911 574.513776zM523.411911 446.645526c-23.985274 0-43.500746 19.516496-43.500746 43.50484 0 23.986297 19.514449 43.500746 43.500746 43.500746 23.988344 0 43.505863-19.514449 43.505863-43.500746C566.917774 466.162022 547.401278 446.645526 523.411911 446.645526z"/><path d="M801.246707 574.513776c-46.517453 0-84.362386-37.844933-84.362386-84.362386 0-46.520523 37.844933-84.367503 84.362386-84.367503 46.520523 0 84.367503 37.84698 84.367503 84.367503C885.61421 536.668843 847.76723 574.513776 801.246707 574.513776zM801.246707 446.645526c-23.985274 0-43.500746 19.516496-43.500746 43.50484 0 23.986297 19.514449 43.500746 43.500746 43.500746 23.988344 0 43.505863-19.514449 43.505863-43.500746C844.75257 466.162022 825.235051 446.645526 801.246707 446.645526z"/></svg>
      </div>
      <template v-slot:content>
        <ul class="neko-api-item__delete-list">
          <li @click="toDelete">删除</li>
          <li @click="toRename">重命名</li>
        </ul>
      </template>
    </vi-dropdown>
    <vi-dialog v-model="deleteDialogOpen" @sure="deleteApi" title="确认提醒" blur>
      你确定要删除接口 {{ props.api.title }} 吗？
    </vi-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Method } from '../network'
import { useApiStore } from '../store'
import type { Api } from '../network'
import { ViMessage } from 'viog-ui'
const apiStore = useApiStore()
const props = defineProps<{
  api: Api
}>()

/**
 * 可编辑title
 */
const contenteditableTitle = ref()
const contenteditable = ref(false)
const optionListOpen = ref(false)
const deleteDialogOpen = ref(false)

const method = computed(() => {
  if (!props.api) return null
  // console.log(now)
  switch (props.api.method) {
    case Method.get:
      return 'GET'
    case Method.put:
      return 'PUT'
    case Method.post:
      return 'POST'
    case Method.head:
      return 'HEAD'
    case Method.delete:
      return 'DEL'
    case Method.connect:
      return 'CON'
    case Method.options:
      return 'OPT'
    case Method.patch:
      return 'PAT'
    default:
      return null
  }
})

function toRename () {
  contenteditable.value = true
  optionListOpen.value = false
  setImmediate(() => {
    contenteditableTitle.value.focus()
  })
}

async function saveApiTitle () {
  const newTitle = contenteditableTitle.value.innerText
  if (newTitle === '') return ViMessage.append('修改失败!', 2000)
  contenteditable.value = false
  const val = await apiStore.updateApiTitle(props.api, newTitle)
  if (val.code === 200) {
    ViMessage.append('修改成功', 2000)
    props.api.title = newTitle
  } else if (val.code === 500) {
    contenteditableTitle.value.innerText = props.api.title
    ViMessage.append('修改失败!', 2000)
  }
}

function toDelete () {
  deleteDialogOpen.value = true
}

async function deleteApi () {
  const val = await apiStore.delApi(props.api.aid)
  if (val.code === 200) {
    ViMessage.append('删除成功', 2000)
  } else {
    ViMessage.append('删除失败', 2000)
  }
}
</script>

<style lang="less" scoped>
.neko-api-item {
  display: flex;
  min-width: 100px;
  max-width: 240px;
  width: 100%;
  padding: .6em .8em;
  align-items: center;
  justify-content: space-between;
  color: var(--neko-white-font-color);
  border-radius: 1.2em;
  box-sizing: border-box;
  gap: 8px;
  --vi-dropdown-gap: 4px;

  &:hover {
    box-shadow: inset 0 0 0 1px var(--vi-purple-color5);
    background-color: var(--neko-content-bg-color);
  }

  .neko-api-item__methods {
    width: 36px;
    font-size: 12px;
    font-weight: 600;
  }

  .neko-api-item__methods-POST {
    color: var(--vi-yellow-color1);
  }

  .neko-api-item__methods-GET {
    color: var(--vi-green-color1);
  }

  .neko-api-item__methods-PUT {
    color: var(--vi-blue-color1);
  }

  .neko-api-item__methods-HEAD {
    color: var(--vi-golden-color2);
  }

  .neko-api-item__methods-DEL {
    color: var(--vi-red-color1);
  }

  .neko-api-item__methods-CON {
    color: var(--vi-pink-color1);
  }

  .neko-api-item__methods-OPT {
    color: var(--vi-green-color4);
  }

  .neko-api-item__methods-TRACE {
    color: var(--vi-yellow-color4);
  }

  .neko-api-item__methods-PAT {
    color: var(--vi-blue-color3);
  }

  .neko-api-item__methods-unknown {
    color: var(--neko-grey-font-color);
  }

  .neko-api-item__title {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    user-select: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    outline: none;
  }

  .neko-api-item__delete {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #ffffff30;
    cursor: pointer;

    svg {
      width: 18px;
      fill: var(--vi-purple-color1);
    }
  }

  .neko-api-item__delete-list {
    // position: absolute;
    width: 60px;
    // height: 170px;
    padding: 4px;
    margin-left: -35px;
    background-color: var(--vi-purple-color5);
    box-sizing: border-box;
    box-shadow: inset 0 0 0 1px var(--neko-white-border-color);
    border-radius: var(--vi-card-radius);
    backdrop-filter: blur(12px);

    > li {
      padding: 4px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: var(--vi-purple-color6);
      }
    }
  }
}

.neko-api-item-focus {
  box-shadow: inset 0 0 0 1px var(--vi-purple-color6);
  background-color: var(--neko-content-bg-color-s);

  &:hover {
    box-shadow: inset 0 0 0 1px var(--vi-purple-color6);
    background-color: var(--neko-content-bg-color-s);
  }
}

.neko-api-item-wating-update {
  .neko-api-item__title {
    color: var(--neko-warning-bg-color);
  }
}

.neko-api-item_contenteditable-focus {
  box-shadow: inset 0 0 0 1px var(--vi-purple-color6),
  inset 0 0 10px 0 var(--vi-purple-color6);
  background-color: var(--neko-white-bg-color);

  &:hover {
    box-shadow: inset 0 0 0 1px var(--vi-purple-color6),
    inset 0 0 10px 0 var(--vi-purple-color6);
    background-color: var(--neko-white-bg-color);
  }
}
</style>