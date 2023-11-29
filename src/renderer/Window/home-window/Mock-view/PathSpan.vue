<template>
  <div class="neko-path">
    <span class="neko-path-item">{{ viewPath }}</span>
    <span class="neko-path-desc">{{ mock?.title ?? '暂无说明' }}</span>
  </div>
</template>

<script lang="ts" setup>
import { Mock } from '@/renderer/network'
import { computed } from 'vue'

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
    overflow: hidden;
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
</style>