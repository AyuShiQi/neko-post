<template>
  <vi-dropdown
  class="neko-option-list-dropdown"
  v-if="profileStore.isLogin" v-model="optionListOpen">
    <div class="option-list">
      <span class="iconfont icon-daohang"></span>
    </div>
    <template v-slot:content>
      <vi-cascader
      v-model="optionPick"
      :options="moreOptions"
      @pick="handleOptionListPick"
      class="option-list__list"></vi-cascader>
    </template>
  </vi-dropdown>
  <NewProjectBox v-model="showNewProject"/>
  <vi-dialog v-model="updaingDialogOpen" @sure="handleUpdateWatingApi" @unSure="shutdownOptionList">
    项目 {{ profileStore.projectList.target?.pname }} 有未保存内容，是否保存？
  </vi-dialog>
</template>

<script lang="ts" setup>
import NewProjectBox from './NewProjectBox.vue'
import { reactive, ref } from 'vue'
import { useProfileStore, useApiStore } from '../store'
const profileStore = useProfileStore()
const apiStore = useApiStore()

/**
 * 级联列表选择value
 */
const optionPick = reactive([])

const moreOptions = reactive([
  {
    label: '创建新项目',
    value: 0
  },
  {
    label: '打开项目',
    value: 1,
    children: [{
      label: '暂无项目',
      value: null
    }]
  },
  {
    label: '设置',
    value: 2
  }
])

const optionListOpen = ref(false)

/**
 * 展示新建项目对话框
 */
const showNewProject = ref(false)
/**
 * 是否保存旧项目未更新内容对话框
 */
const updaingDialogOpen = ref(false)
/**
 * 待打开的pid
 */
 const watingOpenPid = ref()

/**
 * 级联选择事件
 * @param res 结果
 * @param step 层级
 */
function handleOptionListPick (res: any[], step: number) {
  // console.log('optionPick', res)
  if (step === 0) {
    const valueZero = res[0]
    switch (valueZero) {
      case 0:
        shutdownOptionList()
        createNewProject()
        break
      case 1:
        showProjectList()
        break
      case 2:
        shutdownOptionList()
        break
    }
  } else if (step === 1) {
    shutdownOptionList()
    // 寻找并打开相关项目
    watingOpenPid.value = res[1]
    // 如果有暂未保存的内容
    if (apiStore.watingUpdateTabList.size !== 0) {
      // 询问是否有要全部更新
      updaingDialogOpen.value = true
    } else {
      openProject()
    }
  }
}

/**
 * 关闭级联选项列表
 */
function shutdownOptionList () {
  optionPick.length = 0
  optionListOpen.value = false
}

/**
 * 打开新建项目对话框
 */
function createNewProject () {
  showNewProject.value = true
}

/**
 * 展示当前打开项目列表逻辑
 */
function showProjectList () {
  const projs = profileStore.projectList.list
  const opc = moreOptions[1].children as any[]
  opc.length = 0
  for (let i = 0; i < projs.length; i++) {
    if (projs[i].pid === profileStore.pid) continue
    opc.push({
      label: projs[i].pname,
      value: projs[i].pid
    })
  }
  if (opc.length === 0) {
    opc.push({
      label: '暂无项目',
      value: null
    })
  }
}

/**
 * 通过打开项目操作，打开一个我的项目
 */
function openProject () {
  if (watingOpenPid.value !== null) profileStore.changeTarget(watingOpenPid.value)
}

/**
 * 确认更新所有未保存项目事件
 */
function handleUpdateWatingApi () {
  apiStore.updateAllWatingUpdate()
  openProject()
}
</script>

<style lang="less" scoped>
.neko-option-list-dropdown {
  .option-list {
    display: flex;
    width: 24px;
    height: 24px;
    color: var(--neko-white-font-color);
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      color: var(--neko-white-font-color-s);
    }

    .iconfont {
      font-size: 18px;
    }
  }

  .option-list__list {
    --vi-cascader-width: 150px 200px;
    --vi-cascader-max-height: auto 200px;
    --vi-cascader-font-color: var(--neko-white-font-color);
    --vi-cascader-arrow-color: var(--neko-grey-font-color);
    --vi-cascader-hover-font-color: var(--neko-white-font-color);
    --vi-cascader-hover-arrow-color: var(--neko-grey-font-color);
    --vi-cascader-picked-font-color: var(--neko-white-font-color);
    --vi-cascader-picked-arrow-color: var(--neko-grey-font-color);
    --vi-cascader-bg-color: var(--neko-content-bg-color);
    --vi-cascader-backdrop-filter: blur(10px);
    --vi-cascader-box-shadow: inset 0 0 0 1px var(--neko-white-border-color);
    --vi-cascader-gap: 2px;

    li {
      display: flex;
      width: 100%;
      height: 32px;
      padding: 6px 8px;
      align-items: center;
      box-sizing: border-box;
      border-radius: var(--vi-card-radius);
      cursor: pointer;

      &:hover {
        background-color: var(--vi-purple-color6);
      }
    }
  }
}
</style>