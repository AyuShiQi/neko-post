<template>
  <div class="neko-workspace">
    <div class="server-run-attention" v-if="mockStore.serverStart">
      服务启动成功，服务url：127.0.0.1:{{ mockStore.port }}
    </div>
    <div class="path-breadcrumb">
      <vi-breadcrumb class="path-breadcrumb__content">
        <vi-breadcrumb-item v-for="item of mockStore.pathList" :key="item">{{ item }}</vi-breadcrumb-item>
      </vi-breadcrumb>
      <div class="path-nav">
        <span class="path-nav-item"
        @click="setting = 0"
        :class="{
          'path-nav__pick': setting === 0
        }">服务配置</span>
        <span class="path-nav-item"
        @click="setting = 1"
        :class="{
          'path-nav__pick': setting === 1
        }">路径设置</span>
      </div>
    </div>
    <div class="workspace-content vi-scroll-bar" v-if="mockStore.mockList.target && setting === 0">
      <vi-drag-list v-model="mockStore.mockList.target.option" class="drag-list">
        <template v-slot="{ data }">
          <OptionItem :opt="data" @delete="deleteOpt(data)"/>
        </template>
      </vi-drag-list>
      <div class="neko-add-opt" @click="addNewOption">
        <svg viewBox="0 0 20 20" class="add-opt">
          <path d="M2 10 L18 10 M10 2 L10 18"></path>
        </svg>
      </div>
    </div>
    <SettingPlace v-if="mockStore.mockList.target && setting === 1"/>
  </div>
</template>

<script lang="ts" setup>
import OptionItem from './OptionItem.vue'
import SettingPlace from './SettingPlace.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useMockStore } from '@/renderer/store'
import { ViMessage } from 'viog-ui'
const mockStore = useMockStore()

const setting = ref(0)

function addNewOption () {
  if (mockStore.mockList.target) {
    (mockStore.mockList.target.option as any[]).push({
      method: 0
    })
    mockStore.addWatingUpdateTab(mockStore.mid)
  }
}

async function saveMockOpt (e: KeyboardEvent) {
  if (e.ctrlKey && e.code === 'KeyS') {
    console.log('ok')
    if (mockStore.mid && mockStore.isWatingUpdate(mockStore.mid)) {
      const res = await mockStore.updateMockOpt(mockStore.mockList.target)
      if (res.code === 200) {
        mockStore.removeWatingUpdateTab(mockStore.mid)
      } else {
        ViMessage.append('更新失败!', 2000)
      }
    }
  }
}

function deleteOpt (target: any) {
  const index = mockStore.mockList.target.option.indexOf(target)
  if (index !== -1) {
    (mockStore.mockList.target.option as any[]).splice(index, 1)
    mockStore.addWatingUpdateTab(mockStore.mid)
  }
}

onMounted(() => {
  window.addEventListener('keypress', saveMockOpt)
})

onBeforeUnmount(() => {
  window.addEventListener('keypress', saveMockOpt)
})
</script>

<style lang="less" scoped>
.neko-workspace {
  flex: 1;
  height: 100%;
  // padding: 8px 0;
  box-sizing: border-box;

  .server-run-attention {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: var(--vi-green-color3);
    background-color: var(--vi-green-color5);
  }

  .path-breadcrumb {
    display: flex;
    height: 28px;
    --vi-background-color-deep: var(--neko-grey-font-color);
    align-items: flex-end;
    justify-content: space-between;

    .path-breadcrumb__content {
      flex: 1;
      line-height: 28px;
    }

    .path-nav {
      overflow: hidden;
      display: flex;
      border: 1px solid var(--neko-white-border-color);
      border-radius: 5px;
      font-size: 10px;
      cursor: pointer;
      // padding: 4px 8px;
      // width: 40px;
      .path-nav-item {
        padding: 6px;

        &:hover {
          background-color: var(--neko-bg-color-s);
        }

        &:first-child {
          border-right: 1px solid var(--neko-white-border-color);
        }
      }

      .path-nav-item.path-nav__pick {
        background-color: var(--neko-content-bg-color);
      }
    }
  }

  .tab-content {
    width: 100%;
    height: 40px;
    background-color: var(--neko-content-bg-color);
  }

  .workspace-content {
    width: 100%;
    height: calc(100% - 68px);
    box-sizing: border-box;
    // padding: 10px 8px 0 8px;

    .drag-list {
      width: 100%;
      align-items: center; 
    }

    .neko-add-opt {
      display: flex;
      width: 100%;
      // max-width: 200px;
      height: 40px;
      margin-top: 8px;
      box-shadow: inset 0 0 0 1px var(--neko-white-border-color);
      border-radius: 5px;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background-color: var(--neko-bg-color);
      }

      .add-opt {
        width: 30px;
        stroke: #fff;
        stroke-linecap: round;
      }
    }
  }
}
</style>