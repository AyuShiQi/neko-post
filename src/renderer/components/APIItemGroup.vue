<template>
  <vi-collapse title="用户相关接口" class="neko-apis-list-group">
    <template v-slot:title>
      <vi-context-menu>
        <div class="neko-apis-list-group__title">{{ props.title }}</div>
        <template v-slot:content>
          <ul class="neko-apis-list-group__title-list" @click="stopPropagation">
            <li>删除组</li>
            <li>重命名</li>
          </ul>
        </template>
      </vi-context-menu>
    </template>
    <slot></slot>
  </vi-collapse>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()

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

  .neko-apis-list-group__title {
    width: 100%;
    text-align: left;
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
</style>