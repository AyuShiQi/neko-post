<template>
  <div class="neko-main-apis">
    <vi-flex
    class="neko-apis-list"
    style="height: 100%;"
    horizontal="none">
      <div class="neko-apis-list__header">
        <svg viewBox="0 0 20 20">
          <path d="M2 10 L18 10 M10 2 L10 18"/>
        </svg>
        <p>新建接口</p>
      </div>
      <div class="neko-apis-list-scroll">
        <vi-scroll>
          <APIItem/>
          <APIItem/>
          <APIItem/>
          <APIItem/>
          <APIItem/>s
        </vi-scroll>
      </div>
    </vi-flex>
    <div class="neko-apis-workspace">
    </div>
  </div>
</template>

<script lang="ts" setup>
import APIItem from '@/renderer/components/APIItem.vue';
</script>

<style lang="less" scoped>
.neko-main-apis {
  display: flex;
  width: 100%;
  height: 100%;

  .neko-apis-list {
    --vi-flex-default-width: 100px;
    --vi-flex-min-width: 100px;
    --vi-flex-max-width: 220px;
    --vi-flex-drag-active-color: var(--vi-purple-color6);
    padding: 0 4px;
    background-color: var(--neko-content-bg-color);
    box-sizing: border-box;

    .neko-apis-list__header {
      display: flex;
      width: 100%;
      height: 32px;
      // background-color: var(--neko-content-bg-color);
      border-bottom: 1px solid var(--neko-main-bg-color);
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;

      svg {
        width: 14px;
        stroke-width: 2;
        stroke-linecap: round;
        stroke: var(--neko-white-font-color);
        cursor: pointer;

        &:hover {
          stroke: var(--neko-white-font-color-s);
        }
      }
      
      p {
        font-size: 12px;
        color: var(--neko-white-border-color);
        user-select: none;
      }
    }

    .neko-apis-list-scroll {
      width: 100%;
      height: calc(100% - 32px);
      --vi-scroll-width: 100%;
      --vi-scroll-height: 100%;
    }
  }

  .neko-apis-workspace {
    width: 100px;
    height: 100%;
    flex: 1;
    // background-color: var(--neko-main-bg-color);
  }
}
</style>