<template>
  <vi-tab-card-group
  class="neko-workspce-header"
  type="button"
  v-model="apiStore.aid"
  @delete="handleTabDelete">
    <vi-tab-card
    v-for="item of apiStore.tabList.values()"
    :value="item.aid"
    :key="item"
    :class="[
      {
        'neko-tab-card-wating-update': apiStore.isWatingUpdate(item.aid)
      }
    ]">
      <template v-slot:icon>
        <MethodSpan :methods="(item.method as any)"/>
      </template>
      {{ item.title }}
    </vi-tab-card>
  </vi-tab-card-group>
  <vi-dialog
  v-model="saveDialog"
  class="neko-save-dialog"
  blur
  title="保存提醒"
  sureTitle="保存"
  unsureTitle="放弃更改"
  @sure="handleSave"
  @unSure="handleNoSave">
    该项目暂未保存，是否保存？
  </vi-dialog>
</template>

<script lang="ts" setup>
import MethodSpan from '@/renderer/components/MethodSpan.vue'
import { ref } from 'vue'
import { useApiStore } from '@/renderer/store'
import { ViMessage } from 'viog-ui'
const apiStore = useApiStore()

let deleteAid: string | undefined
const saveDialog = ref(false)

/**
 * 处理tab删除
 * @param aid aid
 */
function handleTabDelete (aid: string) {
  // 如果在待更新列表中，需要先提醒一下（还未保存，是否保存）操作跳转
  if (apiStore.isWatingUpdate(aid)) {
    deleteAid = aid
    saveDialog.value = true
  } else {
    // 观察是不是当前打开的
    apiStore.removeTab(aid)
    apiStore.aid = apiStore.getTabApi()
  }
}

/**
 * 保存待更新接口
 */
function handleSave () {
    if (!deleteAid) return
    const target = apiStore.tabList.get(deleteAid)
    if (target) {
      // 更新
      apiStore.updateApi(target).then(val => {
        if (val.code === 200) {
          // 从待更新列表删除
          apiStore.removeWatingUpdateTab(deleteAid)
          apiStore.removeTab(deleteAid)
          deleteAid = undefined
          // 观察是不是当前打开的
          apiStore.aid = apiStore.getTabApi()
        } else {
          ViMessage.append('保存失败！', 2000)
        }
      })
    }
  }

/**
 * 处理不更新接口
 */
function handleNoSave () {
  // 从待更新列表删除
  // 从远端获取更新
  if (deleteAid === apiStore.apiList.base.aid) {
    apiStore.loadBase().then(val => {
      handleSucess(val.code)
    })
  } else {
    apiStore.loadApiList().then(val => {
      handleSucess(val.code)
    })
  }

  function handleSucess (code: number) {
    // 成功更新了
    if (code === 200) {
      apiStore.removeWatingUpdateTab(deleteAid)
      apiStore.removeTab(deleteAid)
      // 观察是不是当前打开的
      apiStore.aid = apiStore.getTabApi()
    } else {
      ViMessage.append('操作失败！', 2000)
    }
    deleteAid = undefined
  }
}
</script>

<style lang="less">
  .neko-save-dialog {
    --vi-dialog-background-color: var(--vi-purple-color6);
  }
</style>

<style lang="less" scoped>
  .neko-workspce-header {
    width: 100%;
    height: 40px;
    color: var(--neko-grey-font-color);
    background-color: var(--neko-content-bg-color);
    box-sizing: border-box;
    user-select: none;

    --vi-tab-card-height: 40px;
    --vi-background-color-solid: var(--neko-tab-color-s);
    --vi-background-color-deep: var(--neko-tab-color);
    --vi-bg-color-deep-alpha: var(--neko-bg-color-s);
    --vi-bg-color-deeper-alpha: var(--neko-main-bg-color);

    .neko-tab-card-wating-update {
      position: relative;

      &::after {
        position: absolute;
        content: "";
        top: 4px;
        right: 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--neko-warning-bg-color);
      }
    }
  }
</style>