<template>
  <span class="neko-methods-span"
  :class="[
    `neko-api-item__methods-${method}`
  ]">{{ method }}</span>
</template>

<script lang="ts" setup>
import { withDefaults, computed } from 'vue'
import { Method } from '../network';
const props = withDefaults(defineProps<{
  methods: Method
}>(), {
  methods: 2
})

const method = computed(() => {
  switch (props.methods) {
    case Method.get:
      return 'GET'
    case Method.put:
      return 'PUT'
    case Method.post:
      return 'POST'
    case Method.head:
      return 'HEAD'
    case Method.delete:
      return 'DEL'
    case Method.connect:
      return 'CON'
    case Method.options:
      return 'OPT'
    case Method.patch:
      return 'PAT'
    default:
      return null
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