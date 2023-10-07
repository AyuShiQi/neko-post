<template>
  <span class="neko-methods-span"
  :class="[
    `neko-api-item__methods-${methods}`
  ]">{{ props.methods }}</span>
</template>

<script lang="ts" setup>
import { withDefaults, computed } from 'vue'
const props = withDefaults(defineProps<{
  methods: 'post' | 'get' | 'put' | 'head' | 'delete' | 'connect' | 'options' | 'patch'
}>(), {
  methods: 'post'
})

const methods = computed(() => {
  const now = props.methods.toUpperCase()
  switch (now) {
    case 'DELETE':
      return 'DEL'
    case 'CONNECT':
      return 'CON'
    case 'OPTIONS':
      return 'OPT'
    case 'PATCH':
      return 'PAT'
    default:
      return now
  }
})
</script>

<style lang="less" scoped>

  .neko-methods-span {
    font-size: 12px;
    font-weight: 600;
    display: inline;
  }
  .neko-api-item__methods-POST {
    color: var(--vi-yellow-color1);
  }

  .neko-api-item__methods-GET {
    color: var(--vi-green-color1);
  }

  .neko-api-item__methods-PUT {
    color: var(--vi-blue-color1);
  }

  .neko-api-item__methods-HEAD {
    color: var(--vi-golden-color2);
  }

  .neko-api-item__methods-DEL {
    color: var(--vi-red-color1);
  }

  .neko-api-item__methods-CON {
    color: var(--vi-pink-color1);
  }

  .neko-api-item__methods-OPT {
    color: var(--vi-green-color4);
  }

  .neko-api-item__methods-TRACE {
    color: var(--vi-yellow-color4);
  }
  .neko-api-item__methods-PAT {
    color: var(--vi-blue-color3);
  }
</style>