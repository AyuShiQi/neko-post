<template>
  <div class="neko-main-mock">
    <vi-flex
    class="neko-mock-list"
    horizontal="none">
    </vi-flex>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.neko-main-mock {
  display: flex;
  width: 100%;
  height: 100%;
  .neko-mock-list {
    overflow: hidden;
    height: 100%;
    --vi-flex-default-width: 260px;
    --vi-flex-min-width: 0px;
    --vi-flex-max-width: 260px;
    --vi-flex-drag-active-color: var(--vi-purple-color6);
    padding: 0 4px;
    background-color: var(--neko-bg-color);
    box-sizing: border-box;
  }
}
</style>