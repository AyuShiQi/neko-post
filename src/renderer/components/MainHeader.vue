<template>
  <div class="neko-main-header">
    <div class="neko-main-header__left">
      <div class="neko-main-header__left__logo">
        <img src="../assets/neko-logo.png" alt="logo">
      </div>
      <!-- 选项列表 -->
      <vi-dropdown v-if="profileStore.isLogin" v-model="optionListOpen">
        <div class="option-list">
          <span class="iconfont icon-daohang"></span>
        </div>
        <template v-slot:content>
          <!-- <li @click="createNewProject">创建新项目</li>
          <li>打开项目</li>
          <li>设置</li> -->
          <vi-cascader
          v-model="optionPick"
          :options="moreOptions"
          @pick="handleOptionListPick"
          class="option-list__list"></vi-cascader>
        </template>
      </vi-dropdown>
      <NewProjectBox v-model="showNewProject"/>
    </div>
    <div class="neko-main-header__center">
      {{ profileStore.isLoadedProject ? profileStore.projectList.target?.pname : '欢迎使用neko post接口管理工具' }}
    </div>
    <div class="neko-main-header__right">
      <div class="option-box" @click="minimizWindow">
        <span class="iconfont icon-2zuixiaohua-2"></span>
      </div>
      <div class="option-box" @click="handleMaximizeWindow">
        <span class="iconfont icon-zuidahua" v-if="isMaximized"></span>
        <span class="iconfont icon-zuidahua1" v-else></span>
      </div>
      <div class="option-box guanbi" @click="closeWindow">
        <span class="iconfont icon-guanbi"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NewProjectBox from './NewProjectBox.vue'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { ipcRenderer } from 'electron'
import { useProfileStore } from '../store'
const profileStore = useProfileStore()
const optionListOpen = ref(false)
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

const isMaximized = ref(true)
const showNewProject = ref(false)

// 下面是最大最小关闭事件
function handleMaximizeWindow () {
  isMaximized.value ? unmaximizeWindow() : maximizWindow()
}
/**
 * 最大化窗口
 */
function maximizWindow () {
  ipcRenderer.invoke('maxmizeWindow')
}

/**
 * 最小化窗口
 */
function minimizWindow () {
  ipcRenderer.invoke('minimizeWindow')
}

/**
 * 取消最大化
 */
function unmaximizeWindow () {
  ipcRenderer.invoke('unmaximizeWindow')
}

/**
 * 关闭窗口
 */
 function closeWindow () {
  ipcRenderer.invoke('closeWindow')
}

/**
 * 最大最小化变换组
 */
function winMaximizeEvent () {
  isMaximized.value = true
}
function winUnmaximizeEvent () {
  isMaximized.value = false
}

function handleOptionListPick (res: any[], step: number) {
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
    const valuePro = res[1]
    if (valuePro === null) {
      shutdownOptionList()
      return
    }
    // 寻找并打开相关项目
    console.log(valuePro)
  }
}

function shutdownOptionList () {
  optionPick.length = 0
  optionListOpen.value = false
}

function createNewProject () {
  showNewProject.value = true
}

function showProjectList () {
  const projs = profileStore.projectList.list
  const opc = moreOptions[1].children as any[]
  opc.length = projs.length
  for (let i = 0; i < projs.length; i++) {
    opc[i] = {
      label: projs[i].pname,
      value: projs[i].pid
    }
  }
  if (opc.length === 0) {
    opc.push({
      label: '暂无项目',
      value: null
    })
  }
}

onMounted(() => {
  ipcRenderer.invoke('maxmizeWindow')
  ipcRenderer.on("windowMaximized", winMaximizeEvent);
  ipcRenderer.on("windowUnmaximized", winUnmaximizeEvent);
});
onUnmounted(() => {
  ipcRenderer.off("windowMaximized", winMaximizeEvent);
  ipcRenderer.off("windowUnmaximized", winUnmaximizeEvent);
});
</script>

<style lang="less" scoped>
.neko-main-header {
  display: flex;
  width: 100%;
  height: 40px;
  background-color: var(--neko-bg-color-s);
  justify-content: space-between;
  align-items: center;
  user-select: none;
  // -webkit-app-region: drag;

  .neko-main-header__left {
    display: flex;
    width: 70px;
    height: 100%;
    padding-left: 12px;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;

    .neko-main-header__left__logo {
      width: 18px;
      height: 18px;
      // 可拖拽窗口，但会屏蔽所有鼠标事件
      -webkit-app-region: drag;

      img {
        width: 100%;
        height: 100%;
        user-select: none;
        -webkit-user-drag: none;
      }
    }

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

  .neko-main-header__center {
    display: flex;
    // 可拖拽窗口，但会屏蔽所有鼠标事件
    -webkit-app-region: drag;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: var(--neko-white-font-color);
  }
  .neko-main-header__right {
    display: flex;
    .option-box {
      display: flex;
      width: 44px;
      height: 40px;
      background-color: transparent;
      align-items: center;
      justify-content: center;
      color: var(--neko-white-font-color);

      &:hover {
        background-color: var(--neko-content-bg-color);
      }

      .iconfont {
        font-size: 12px;
      }
    }

    .option-box.guanbi {
      &:hover {
        background-color: var(--neko-error-bg-color);
      }
    }
  }
}
</style>