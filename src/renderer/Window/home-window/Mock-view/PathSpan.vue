<template>
  <div class="neko-path"
  :class="{
    'need-update': mockStore.isWatingUpdate(mock.mid)
  }">
    <span class="neko-path-item">{{ viewPath }}</span>
    <span class="neko-path-desc">{{ mock?.title ?? '暂无说明' }}</span>
  </div>
</template>

<script lang="ts" setup>
import { Mock } from '@/renderer/network'
import { computed } from 'vue'
import { useMockStore } from '@/renderer/store'
const mockStore = useMockStore()

const props = defineProps<{
  mock: Mock
}>()

const viewPath = computed(() => {
  if (props.mock?.path?.length > 0) return props.mock.path
  return '/'
})

</script>

<style lang="less" scoped>
  .neko-path {
    position: relative;
    // overflow: hidden;
    width: 100%;
    .neko-path-item {
      font-weight: 600;
      font-size: 14px;
    }

    .neko-path-desc {
      margin-left: 8px;
      color: var(--neko-grey-font-color);
      font-size: 12px;
    }
  }

  .neko-path.need-update {
    color: var(--neko-warning-bg-color);
    .neko-path-desc {
      color: var(--vi-yellow-color4);
    }
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: -10px;
      width: 6px;
      height: 6px;
      margin-top: -3px;
      background-color: var(--neko-warning-bg-color);
      border-radius: 50%;
    }
  }
</style>