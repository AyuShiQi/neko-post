<template>
  <div class="neko-main-header">
    <div class="neko-main-header__left">
      <div class="neko-main-header__left__logo">
        <img src="../assets/neko-logo.png" alt="logo">
      </div>
      <div class="option-list">
        <span class="iconfont icon-daohang"></span>
      </div>
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
  user-select: none;
  // -webkit-app-region: drag;

  .neko-main-header__left {
    display: flex;
    width: 70px;
    height: 100%;
    padding-left: 12px;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;

    .neko-main-header__left__logo {
      width: 18px;
      height: 18px;
      // 可拖拽窗口，但会屏蔽所有鼠标事件
      -webkit-app-region: drag;

      img {
        width: 100%;
        height: 100%;
        user-select: none;
        -webkit-user-drag: none;
      }
    }

    .option-list {
      display: flex;
      width: 24px;
      height: 24px;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        color: rgb(255, 255, 255);
        background-color: var(--neko-bg-color);
      }

      .iconfont {
        font-size: 18px;
      }
    }
  }

  .neko-main-header__center {
    // 可拖拽窗口，但会屏蔽所有鼠标事件
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