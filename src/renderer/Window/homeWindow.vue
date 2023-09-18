<template>
  <div class="neko-home-main">
    <BarSide/>
    <div class="neko-home-workspace">
      <router-view></router-view>
    </div>
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
    display: flex;
    width: 100%;
    height: calc(100% - 40px);
    background-color: var(--neko-main-bg-color);

    .neko-home-workspace {
      height: 100%;
      flex: 1;
    }
  }
</style>
