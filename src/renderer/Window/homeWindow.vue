<template>
  <div class="neko-home-main">
    <BarSide :style="{
      'pointer-events': profileStore.isLoadedProject ? 'all' : 'none'
    }"/>
    <!-- 加载 -->
    <div class="neko-home-workspace" v-if="profileStore.isLoadedProject">
      <router-view></router-view>
    </div>
    <div class="neko-home-workspace neko-home-project" v-else>
      <p>打开已有项目</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BarSide from '../components/BarSide.vue'
  import { ipcRenderer } from "electron"
  import { onMounted } from "vue"
  import { useProfileStore } from '../store'
  const profileStore = useProfileStore()

  onMounted(() => {
    ipcRenderer.invoke("showWindow");
  })
</script>

<style lang="less">
  .neko-home-main {
    position: relative;
    display: flex;
    width: 100%;
    height: calc(100% - 40px);
    background-color: var(--neko-main-bg-color);

    .neko-home-workspace {
      height: 100%;
      flex: 1;
    }

    .neko-home-project {
      padding: 16px;
      background-color: var(--neko-content-bg-color);
      box-sizing: border-box;
    }
  }
</style>
