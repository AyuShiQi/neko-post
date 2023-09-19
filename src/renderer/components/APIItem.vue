<template>
  <div class="neko-api-item">
    <vi-tag class="neko-api-item__methods">POST</vi-tag>
    <p class="neko-api-item__title">更新用户姓名</p>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.neko-api-item {
  display: flex;
  width: 100%;
  min-width: 200px;
  padding: .6em .4em;
  align-items: center;
  color: var(--neko-white-font-color);
  border-radius: 10px;
  box-sizing: border-box;

  .neko-api-item__methods {
    // width: 20px;
    // height: 20px;
    font-size: 12px;
    color: #fff;
    background-color: var(--vi-green-color3);
  }

  .neko-api-item__title {
    padding-left: 8px;
    font-size: 14px;
    user-select: none;
  }

  &:hover {
    background-color: var(--neko-content-bg-color);
  }
}
</style>