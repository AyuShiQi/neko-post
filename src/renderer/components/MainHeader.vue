<template>
  <div class="neko-main-header">
    <div class="neko-main-header__left">

    </div>
    <div class="neko-main-header__center">
      center
    </div>
    <div class="neko-main-header__right">
      <div class="option-box">
        <span class="iconfont icon-2zuixiaohua-2"></span>
      </div>
      <div class="option-box">
        <span class="iconfont icon-zuidahua1"></span>
      </div>
      <div class="option-box guanbi">
        <span class="iconfont icon-guanbi"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.neko-main-header {
  display: flex;
  width: 100%;
  height: 40px;
  background-color: var(--neko-bg-color);
  justify-content: space-between;
  align-items: center;
  // 可拖拽窗口
  // -webkit-app-region: drag;

  .neko-main-header__left {
    width: 100px;
    height: 100%;
  }

  .neko-main-header__center {
    -webkit-app-region: drag;
    flex: 1;
  }
  .neko-main-header__right {
    display: flex;
    .option-box {
      display: flex;
      width: 44px;
      height: 40px;
      background-color: transparent;
      align-items: center;
      justify-content: center;
      color: var(--neko-white-font-color);

      &:hover {
        background-color: var(--neko-content-bg-color);
      }

      .iconfont {
        font-size: 14px;
      }
    }

    .option-box.guanbi {
      &:hover {
        background-color: var(--neko-error-bg-color);
      }
    }
  }
}
</style>