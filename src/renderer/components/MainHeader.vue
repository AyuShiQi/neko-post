<template>
  <div class="neko-main-header">
    <div class="neko-main-header__left">
      <div class="neko-main-header__left__logo">
        <img src="../assets/neko-logo.png" alt="logo">
      </div>
      <!-- 选项列表 -->
      <vi-dropdown v-if="profileStore.isLogin">
        <div class="option-list">
          <span class="iconfont icon-daohang"></span>
        </div>
        <template v-slot:content>
          <ul class="option-list__list">
            <li @click="createNewProject">创建新项目</li>
            <li>打开项目</li>
            <li>设置</li>
          </ul>
        </template>
      </vi-dropdown>
      <NewProjectBox v-model="showNewProject"/>
    </div>
    <div class="neko-main-header__center">
      欢迎使用neko post接口管理工具
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
import { ref, onMounted, onUnmounted } from 'vue'
import { ipcRenderer } from 'electron'
import { useProfileStore } from '../store'
const profileStore = useProfileStore()

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

function createNewProject () {
  showNewProject.value = true
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
      width: 110px;
      // height: 170px;
      padding: 6px;
      background-color: var(--neko-content-bg-color);
      box-sizing: border-box;
      box-shadow: inset 0 0 0 1px var(--neko-white-border-color);
      border-radius: var(--vi-card-radius);
      backdrop-filter: blur(10px);

      li {
        display: flex;
        width: 100%;
        height: 32px;
        padding: 6px 8px;
        color: var(--neko-white-font-color);
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