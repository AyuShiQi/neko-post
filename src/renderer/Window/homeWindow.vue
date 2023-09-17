<template>
  <div class="neko-home-main">
    <BarSide/>
  </div>
</template>

<script lang="ts" setup>
  import BarSide from '../components/BarSide.vue'
  import { ipcRenderer } from "electron"
  import { onMounted } from "vue"
  onMounted(() => {
    ipcRenderer.invoke("showWindow");
  })
</script>

<style lang="less">
  .neko-home-main {
    width: 100%;
    height: calc(100% - 40px);
    background-color: var(--neko-content-bg-color);
  }
</style>
