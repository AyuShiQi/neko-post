<template>
  <div class="neko-bar-side">
    <ul class="neko-bar-side__option-list">
      <li class="neko-bar-side__option-list-item">
        <div class="icon-option">
          <span class="iconfont icon-yingyong"></span>
        </div>
        <p class="neko-bar-side__option-list-item__title">APIs</p>
      </li>
      <li class="neko-bar-side__option-list-item">
        <div class="icon-option">
          <span class="iconfont icon-fuwuqi"></span>
        </div>
        <p class="neko-bar-side__option-list-item__title">Mock</p>
      </li>
      <li class="neko-bar-side__option-list-item">
        <div class="icon-option">
          <span class="iconfont icon-shuaxin"></span>
        </div>
        <p class="neko-bar-side__option-list-item__title">History</p>
      </li>
    </ul>
    <ul class="neko-bar-side__option-list option-bottom">
      <li class="neko-bar-side__option-list-item">
        <div class="icon-option">
          <span class="iconfont icon-shezhi"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.neko-bar-side {
  display: flex;
  width: 56px;
  height: 100%;
  padding: 16px 0;
  background-color: var(--neko-content-bg-color);
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  .neko-bar-side__option-list {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: flex-start;
    .neko-bar-side__option-list-item {
      display: flex;
      width: 48px;
      // height: 40px;
      padding: 4px 0;
      color: var(--neko-white-font-color);
      border-radius: var(--vi-card-radius);
      flex-direction: column;
      align-items: center;
      justify-content: center;
      user-select: none;
      cursor: pointer;

      &:hover {
        color: #fff;
        background-color: var(--vi-purple-color6);
      }

      .neko-bar-side__option-list-item__title {
        font-size: 10px;
      }

      .icon-option {
        .iconfont {
          font-size: 32px;
        }
        padding-bottom: 6px;
      }
    }
  }

  .neko-bar-side__option-list.option-bottom {
    height: auto;

    .icon-option {
      padding: 4px 0;
    }
  }
}
</style>