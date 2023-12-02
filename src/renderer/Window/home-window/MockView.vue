<template>
  <div class="neko-main-mock">
    <vi-flex
    class="neko-mock-list"
    horizontal="none">
      <!-- mock-list头部栏 -->
      <div class="neko-mock-list__header">
        <!-- 新建按钮 -->
        <div class="neko-mock-list__header-add" @click="createMockPath">
          <svg viewBox="0 0 20 20">
            <path d="M2 10 L18 10 M10 2 L10 18"/>
          </svg>
        </div>
        <!-- 搜索框 -->
        <vi-input type="button" round placeholder="筛选路径" class="neko-mock-list__header-search">
          <template v-slot:prefix>
            <vi-icon type="sousuo" class="search-button"/>
          </template>
        </vi-input>
        <vi-bubble direction="right" class="server-bubble">
          <div class="server-btn"
          :class="{
            'server-btn-start': mockStore.serverStart
          }"
          @click="changeServer">
            <svg class="server-btn_animate"
            viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8"></circle>
              <path></path>
            </svg>
          </div>
          <template v-slot:content>
            {{ mockStore.serverStart? '关闭服务' : '启动服务' }}
          </template>
        </vi-bubble>
      </div>
      <!-- Mock服务栏 -->
      <vi-menu class="mock-list" v-model="mockStore.mid" v-if="mockStore.mockList.tree">
        <MockGroup :mockNode="mockStore.mockList.tree" :step="0"></MockGroup>
      </vi-menu>
      <CreateMock v-model="createOpen"/>
    </vi-flex>
    <WorkSpace v-if="mockStore.mid !== undefined"/>
  </div>
</template>

<script lang="ts" setup>
import WorkSpace from './Mock-view/WorkSpace.vue'
import CreateMock from '@/renderer/components/CreateMock.vue'
import MockGroup from './Mock-view/MockGroup.vue'
import { useMockStore } from '@/renderer/store'
import { ref } from 'vue'
const mockStore = useMockStore()

// const chooseMid = ref(mockStore.mid)

const createOpen = ref(false)
function changeServer () {
  mockStore.serverStart = !mockStore.serverStart
}

function createMockPath () {
  createOpen.value = true
}
</script>

<style lang="less" scoped>
.neko-main-mock {
  display: flex;
  width: 100%;
  height: 100%;
  .neko-mock-list {
    height: 100%;
    --vi-flex-default-width: 260px;
    --vi-flex-min-width: 260px;
    --vi-flex-max-width: 500px;
    --vi-flex-drag-active-color: var(--vi-purple-color6);
    padding: 0 4px;
    background-color: var(--neko-bg-color);
    box-sizing: border-box;
  }

  .neko-mock-list__header {
    display: flex;
    width: 100%;
    height: 40px;
    // background-color: var(--neko-content-bg-color);
    // border-bottom: 1px solid var(--neko-main-bg-color);
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    --vi-dropdown-gap: 4px;

    .neko-mock-list__header-add {
      width: 16px;
      height: 16px;
      padding: 3px;
      border-radius: 3px;
      // box-sizing: border-box;

      &:hover {
        box-shadow: 0 0 0 1px var(--neko-main-bg-color);
      }

      svg {
        width: 16px;
        height: 16px;
        stroke-width: 2;
        stroke-linecap: round;
        stroke: var(--neko-white-font-color);
        cursor: pointer;

        &:hover {
          stroke: var(--neko-white-font-color-s);
        }
      }
    }

    .neko-mock-list__header-search {
      --vi-font-size: 12px;
      font-size: 12px;
      --vi-input-width: auto;
      --vi-input-height: 24px;
      --vi-link-color: var(--neko-white-font-color);
      --vi-background-color: var(--neko-content-bg-color-s);
      --vi-background-color-deep: var(--neko-content-bg-color);
      padding: .4em .6em;
      flex: 1;

      .search-button {
        font-size: 12px;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
          color: var(--vi-purple-color3);
        }
      }
    }

    // --vi-bubble-height: auto;
    --vi-bubble-width: 5em;
    --vi-bubble-padding: .5em;
    --vi-bubble-bg-color: var(--neko-content-bg-color-s);
    .server-btn {
      width: 24px;
      height: 24px;
      padding: 2px;
      border-radius: 3px;
      cursor: pointer;
      box-sizing: border-box;

      .server-btn_animate {
        width: 100%;
        fill: none;
        stroke-width: 1;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: var(--vi-green-color1);

        > circle {
          transform-origin: center;
          transform: rotate(-14deg);
          stroke-dasharray: 43;
          stroke-dashoffset: 0;
          transition: all .8s ease 0s;
        }

        > path {
          d: path('M8 6 L8 14 L14 10 Z');
          transition: all .8s ease 0s;
        }
      }

      &:hover {
        background-color: var(--neko-content-bg-color-s);
      }
    }

    .server-btn-start {
      .server-btn_animate {
        stroke: var(--vi-red-color1);

        > circle {
          transform: rotate(120deg);
          stroke-dashoffset: -90;
        }

        > path {
          d: path('M8 6 L8 14 M12 6 L12 14');
        }
      }
    }
  }

  .mock-list {
    width: 100%; 
    background-color: transparent;
    padding: 0px;
    border-radius: 0px;
    overflow: hidden;
  }
}
</style>