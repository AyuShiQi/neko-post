<template>
  <vi-menu-item v-if="mockNode?.children.length === 0" :value="mockNode?.val?.mid">
    {{ `${mockNode?.val?.path}  ${mockNode?.val?.title}` }}
  </vi-menu-item>
  <vi-menu-group v-else scalable option :value="mockNode?.val?.mid">
    <template v-slot:title>
      {{ mockNode?.val.path + mockNode?.val.title }}
    </template>
    <MockGroup v-for="item of mockNode?.children" :key="item.val?.mid" :mock-node="item"/>
  </vi-menu-group>
</template>

<script lang="ts" setup>
import type { MockTreeNode } from '@/renderer/network'
defineProps<{
  mockNode: MockTreeNode
}>()
</script>

<style lang="less">
</style>