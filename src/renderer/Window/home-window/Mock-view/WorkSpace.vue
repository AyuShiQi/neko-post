<template>
  <div class="neko-workspace">
    <vi-tab-card-group class="tab-content"></vi-tab-card-group>
    <div class="workspace-content"></div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.neko-workspace {
  flex: 1;
  height: 100%;

  .tab-content {
    width: 100%;
    height: 40px;
    background-color: var(--neko-content-bg-color);
  }

  .workspace-content {
    width: 100%;
    height: calc(100% - 40px);
  }
}
</style>