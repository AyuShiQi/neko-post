<template>
  <vi-collapse
  class="neko-apis-list-group"
  :class="{
    'neko-apis-list-group_contenteditable': contenteditable
  }">
    <template v-slot:title>
      <vi-dialog v-model="deleteDialog" @sure="handleDeleteGroup" title="确认提醒" blur>
        是否要删除组 {{ props.group.title }} ?<br/>删除组会导致组内所有接口一并被删除。
      </vi-dialog>
      <vi-context-menu>
        <div class="neko-apis-list-group__title"
        ref="contenteditableTitle"
        @blur="saveGroupTitle"
        :contenteditable="contenteditable"
        >{{ props.title }}</div>
        <template v-slot:content>
          <ul class="neko-apis-list-group__title-list" @click="stopPropagation">
            <li @click="toDelete">删除组</li>
            <li @click="toRename">重命名</li>
          </ul>
        </template>
      </vi-context-menu>
    </template>
    <slot></slot>
  </vi-collapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useApiStore } from '../store'
import type { Api } from '../network';
import { ViMessage } from 'viog-ui'
const props = defineProps<{
  group: Api,
  title: string
}>()
const apiStore = useApiStore()

const contenteditableTitle = ref()
const contenteditable = ref(false)
const deleteDialog = ref(false)

function toRename () {
  contenteditable.value = true
  setImmediate(() => {
    contenteditableTitle.value.focus()
  })
}

function toDelete () {
  deleteDialog.value = true
}

async function handleDeleteGroup () {
  const val = await apiStore.delApiGroup(props.group.aid)
  if (val.code === 200) {
    ViMessage.append('删除成功', 2000)
  } else if (val.code === 500) {
    ViMessage.append('删除失败', 2000)
  }
}

async function saveGroupTitle () {
  contenteditable.value = false
  const nTitle = contenteditableTitle.value.innerText
  if (nTitle === '') {
    contenteditableTitle.value.innerText = props.group.title
    return ViMessage.append('修改失败!', 2000)
  }
  const val = await apiStore.updateApiTitle(props.group, nTitle)
  if (val.code === 200) {
    ViMessage.append('修改成功', 2000)
    props.group.title = nTitle
  } else if (val.code === 500) {
    contenteditableTitle.value.innerText = props.group.title
    ViMessage.append('修改失败!', 2000)
  }
}

function stopPropagation (e: Event) {
  e.stopPropagation()
}
</script>

<style lang="less" scoped>
.neko-apis-list-group {
  --vi-collapse-width: 100%;
  min-width: 240px;
  --vi-link-color: var(--neko-white-font-color);
  border-top: 0;
  border-bottom-color: var(--neko-main-bg-color);
  font-size: 12px;
  font-weight: 600;
  color: var(--neko-white-font-color);
  user-select: none;
  --vi-context-menu-width: 60px;
  --vi-context-menu-height: 48px;
  --vi-context-menu-z-index: 100;

  .neko-apis-list-group__title {
    width: 100%;
    text-align: left;
    outline: none;
    box-sizing: border-box;
  }

  .neko-apis-list-group__title-list {
    width: 60px;
    // height: 170px;
    padding: 4px;
    background-color: var(--vi-purple-color5);
    box-sizing: border-box;
    box-shadow: inset 0 0 0 1px var(--neko-white-border-color);
    border-radius: var(--vi-card-radius);
    backdrop-filter: blur(12px);

    li {
      width: 100%;
      padding: 4px;
      border-radius: 5px;
      box-sizing: border-box;

      &:hover {
        background-color: var(--vi-purple-color6);
      }
    }
  }
}

.neko-apis-list-group_contenteditable {
  .neko-apis-list-group__title {
    padding: .6em .4em;
    background-color: var(--neko-white-bg-color);
    box-shadow: inset 0 0 0 1px var(--vi-purple-color6),
    inset 0 0 10px 0 var(--vi-purple-color6);
    border-radius: 5px;
  }
}
</style>