<template>
</template>

<script lang="ts" setup>
  import { ipcRenderer } from "electron"
  import { onMounted } from "vue"
  onMounted(() => {
    ipcRenderer.invoke("showWindow");
  })
</script>

<style lang="less">
</style>
