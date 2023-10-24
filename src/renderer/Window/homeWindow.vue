<template>
  <div class="neko-home-main">
    <BarSide :style="{
      'pointer-events': profileStore.isLoadedProject ? 'all' : 'none'
    }"/>
    <!-- 加载 -->
    <div class="neko-home-workspace" v-show="profileStore.isLoadedProject">
      <router-view></router-view>
    </div>
    <div class="neko-home-workspace neko-home-project" v-show="!profileStore.isLoadedProject">
      <p class="project-item-title">打开已有项目</p>
      <p
      v-for="proj of profileStore.projectList.list"
      :id="proj.pname"
      class="project-item"
      @click="handleOpenProject(proj.pid, proj.pname)"
      >{{ proj.pname }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BarSide from '../components/BarSide.vue'
  import { ipcRenderer } from "electron"
  import { onMounted } from "vue"
  import { useProfileStore } from '../store'
  import { toHomeApis } from '../router/index.op'
  const profileStore = useProfileStore()

  function handleOpenProject (pid: string, pname: string) {
    // 去查找proj
    const proj = profileStore.findProjectWithPname(pname)
    if (proj) {
      // console.log('ok')
      profileStore.pid = pid
      profileStore.isLoadedProject = true
      toHomeApis()
    }
  }

  onMounted(() => {
    ipcRenderer.invoke("showWindow");
  })
</script>

<style lang="less" scoped>
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

      .project-item-title {
        padding-bottom: 8px;
      }

      .project-item {
        // display: inline-block;
        padding: 8px 0;
        color: var(--neko-grey-font-color);
        user-select: none;
        cursor: pointer;

        &:hover {
          color: var(--vi-purple-color1);
          text-decoration: underline;
        }
      }
    }
  }
</style>
