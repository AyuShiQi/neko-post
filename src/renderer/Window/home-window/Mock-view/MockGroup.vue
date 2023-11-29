<template>
  <vi-menu-item v-if="mockNode?.children.length === 0" :value="mockNode?.val.mid">
    <PathSpan :mock="mockNode?.val"></PathSpan>
  </vi-menu-item>
  <vi-menu-group v-else scalable option :value="mockNode?.val.mid">
    <template v-slot:title>
      <PathSpan :mock="mockNode?.val"></PathSpan>
    </template>
    <MockGroup v-for="item of mockNode?.children" :key="item.val?.mid" :mock-node="item" :step="step + 1"/>
    <vi-divider/>
  </vi-menu-group>
</template>

<script lang="ts" setup>
import PathSpan from './PathSpan.vue'
import type { MockTreeNode } from '@/renderer/network'
defineProps<{
  mockNode: MockTreeNode,
  step: number
}>()
</script>

<style lang="less">
</style>