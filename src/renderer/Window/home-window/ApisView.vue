<template>
  <div class="neko-main-apis">
    <vi-flex
    class="neko-apis-list"
    style="height: 100%;"
    horizontal="none">
      <!-- api-list头部栏 -->
      <div class="neko-apis-list__header">
        <!-- 新建按钮 -->
        <vi-dropdown>
          <div class="neko-apis-list__header-add">
            <svg viewBox="0 0 20 20">
              <path d="M2 10 L18 10 M10 2 L10 18"/>
            </svg>
          </div>
          <template v-slot:content>
            <ul class="neko-apis-list__header-add-list">
              <li class="header-add-list-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" version="1.1"><path d="M390.095238 755.809524h243.809524v146.285714H390.095238z" fill="#C7B2FF"/><path d="M731.428571 975.238095H292.571429c-26.819048 0-48.761905-21.942857-48.761905-48.761905s21.942857-48.761905 48.761905-48.761904h438.857142c26.819048 0 48.761905 21.942857 48.761905 48.761904s-21.942857 48.761905-48.761905 48.761905zM926.47619 780.190476H97.52381c-53.638095 0-97.52381-43.885714-97.52381-97.523809V146.285714c0-53.638095 43.885714-97.52381 97.52381-97.523809h828.95238c53.638095 0 97.52381 43.885714 97.52381 97.523809v536.380953c0 53.638095-43.885714 97.52381-97.52381 97.523809z" fill="#8F65FF"/><path d="M195.047619 572.952381c-14.628571-14.628571-14.628571-36.571429 0-51.2l185.295238-185.295238c14.628571-14.628571 36.571429-14.628571 51.2 0l131.657143 131.657143 212.114286-212.114286c14.628571-14.628571 36.571429-14.628571 51.2 0 14.628571 14.628571 14.628571 36.571429 0 51.2l-238.933334 238.933333c-14.628571 14.628571-36.571429 14.628571-51.2 0L407.161905 414.47619l-158.476191 158.476191c-17.066667 14.628571-39.009524 14.628571-53.638095 0z" fill="#FFFFFF"/></svg>
                <p>接口</p>
              </li>
              <li class="header-add-list-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" version="1.1"><path d="M512 872.838095c-24.380952 0-46.32381-4.87619-68.266667-17.066666l-365.714285-190.171429-51.2 26.819048c-34.133333 17.066667-34.133333 68.266667 0 85.333333l451.047619 236.495238c9.752381 4.87619 21.942857 7.314286 34.133333 7.314286s24.380952-2.438095 34.133333-7.314286l451.047619-236.495238c34.133333-17.066667 34.133333-68.266667 0-85.333333l-51.2-26.819048-365.714285 190.171429c-21.942857 12.190476-43.885714 17.066667-68.266667 17.066666z" fill="#8F65FF"/><path d="M997.180952 468.114286l-51.2-26.819048-134.095238 70.704762-80.457143 41.447619-151.161904 80.457143c-21.942857 9.752381-43.885714 17.066667-68.266667 17.066667s-46.32381-4.87619-68.266667-17.066667L292.571429 553.447619 212.114286 512l-134.095238-70.704762-51.2 26.819048c-34.133333 17.066667-34.133333 68.266667 0 85.333333l51.2 26.819048 78.019047 41.447619 319.390476 168.228571c9.752381 4.87619 21.942857 7.314286 34.133334 7.314286s24.380952-2.438095 34.133333-7.314286l319.390476-168.228571 78.019048-41.447619 51.2-26.819048c39.009524-17.066667 39.009524-65.828571 4.87619-85.333333z" fill="#C7B2FF"/><path d="M512 799.695238c-12.190476 0-24.380952-2.438095-34.133333-7.314286L158.47619 624.152381l-78.019047 41.447619 365.714286 190.171429c21.942857 9.752381 43.885714 17.066667 68.266666 17.066666s46.32381-4.87619 68.266667-17.066666l365.714286-190.171429-78.019048-41.447619-319.390476 168.228571c-14.628571 4.87619-26.819048 7.314286-39.009524 7.314286z" fill="#FFFFFF"/><path d="M997.180952 246.247619L546.133333 9.752381c-4.87619-2.438095-9.752381-4.87619-17.066666-7.314286-4.87619-2.438095-12.190476-2.438095-17.066667-2.438095s-12.190476 0-17.066667 2.438095-12.190476 2.438095-17.066666 7.314286L26.819048 246.247619c-34.133333 17.066667-34.133333 68.266667 0 85.333333l51.2 26.819048 78.019047 41.447619 134.095238 70.704762 78.019048 41.447619 107.27619 56.07619c9.752381 4.87619 21.942857 7.314286 34.133334 7.314286s24.380952-2.438095 34.133333-7.314286l107.276191-56.07619 78.019047-41.447619 134.095238-70.704762 78.019048-41.447619 51.2-26.819048c39.009524-17.066667 39.009524-68.266667 4.87619-85.333333z" fill="#8F65FF"/><path d="M529.066667 4.87619c-12.190476-2.438095-24.380952-2.438095-34.133334 0 4.87619-2.438095 12.190476-2.438095 17.066667-2.438095 4.87619 0 12.190476 0 17.066667 2.438095z" fill="#FFFFFF"/></svg>
                <p>分组</p>
              </li>
            </ul>
          </template>
        </vi-dropdown>
        <!-- 搜索框 -->
        <vi-input type="button" round placeholder="筛选接口" class="neko-apis-list__header-search">
          <template v-slot:prefix>
            <vi-icon type="sousuo" class="search-button"/>
          </template>
        </vi-input>
      </div>
      <!-- 基础配置区 -->
      <div class="neko-apis-list__base">
        基础配置
      </div>
      <!-- api展示区 -->
      <div class="neko-apis-list-scroll">
        <vi-scroll>
          <APIItemGroup title="用户相关接口">
            <APIItem methods="get" title="用户登录"/>
            <APIItem methods="post" title="用户注册"/>
            <APIItem methods="patch" title="用户获取验证码"/>
            <APIItem methods="delete" title="用户验证手机号"/>
            <APIItem methods="options" title="用户发送邮箱验证码"/>
          </APIItemGroup>
          <APIItemGroup title="用户相关接口">
            <APIItem methods="connect" title="用户token"/>
            <APIItem methods="head" title="自动登录"/>
            <APIItem/>
            <APIItem/>
            <APIItem/>
          </APIItemGroup>
          <APIItemGroup title="用户相关接口">
            <APIItem/>
            <APIItem/>
            <APIItem/>
            <APIItem/>
            <APIItem/>
          </APIItemGroup>
        </vi-scroll>
      </div>
    </vi-flex>
    <!-- 工作区 -->
    <WorkSpace/>
  </div>
</template>

<script lang="ts" setup>
import APIItem from '@/renderer/components/APIItem.vue'
import APIItemGroup from '@/renderer/components/APIItemGroup.vue'
import WorkSpace from './APIs-view/WorkSpaceView.vue'
</script>

<style lang="less" scoped>
.neko-main-apis {
  display: flex;
  width: 100%;
  height: 100%;

  .neko-apis-list {
    overflow: hidden;
    --vi-flex-default-width: 260px;
    --vi-flex-min-width: 0px;
    --vi-flex-max-width: 260px;
    --vi-flex-drag-active-color: var(--vi-purple-color6);
    padding: 0 4px;
    background-color: var(--neko-bg-color);
    box-sizing: border-box;

    .neko-apis-list__header {
      display: flex;
      width: 100%;
      height: 40px;
      // background-color: var(--neko-content-bg-color);
      // border-bottom: 1px solid var(--neko-main-bg-color);
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      --vi-dropdown-gap: 4px;

      .neko-apis-list__header-add {
        width: 16px;
        height: 16px;
        padding: 3px;
        border-radius: 3px;
        // box-sizing: border-box;

        &:hover {
          box-shadow: 0 0 0 1px var(--neko-main-bg-color);
        }

        svg {
          width: 16px;
          height: 16px;
          stroke-width: 2;
          stroke-linecap: round;
          stroke: var(--neko-white-font-color);
          cursor: pointer;

          &:hover {
            stroke: var(--neko-white-font-color-s);
          }
        }
      }

      .neko-apis-list__header-add-list {
        width: 110px;
        // height: 170px;
        padding: 4px;
        background-color: var(--neko-bg-color);
        box-sizing: border-box;
        box-shadow: inset 0 0 0 1px var(--neko-white-border-color);
        border-radius: var(--vi-card-radius);
        backdrop-filter: blur(8px);

        .header-add-list-item {
          display: flex;
          width: 100%;
          padding: 6px 4px;
          gap: 12px;
          border-radius: 3px;
          box-sizing: border-box;

          svg {
            width: 16px;
          }

          p {
            font-size: 14px;
            color: var(--neko-white-font-color);
            // font-weight: 600;
          }

          &:hover {
            background-color: var(--vi-purple-color5);
          }
        }
      }

      .neko-apis-list__header-search {
        --vi-font-size: 12px;
        font-size: 12px;
        --vi-input-width: auto;
        --vi-input-height: 24px;
        --vi-link-color: var(--neko-white-font-color);
        --vi-background-color: var(--neko-content-bg-color-s);
        --vi-background-color-deep: var(--neko-content-bg-color);
        padding: .4em .6em;
        flex: 1;

        .search-button {
          font-size: 12px;
          border-radius: 50%;
          cursor: pointer;

          &:hover {
            color: var(--vi-purple-color3);
          }
        }
      }
    }

    .neko-apis-list__base {
      overflow: hidden;
      width: calc(100% - 12px);
      padding: 6px;
      margin: 6px;
      color: var(--vi-purple-color1);
      text-align: center;
      background-color: transparent;
      white-space: nowrap;
      border-radius: 5px;
      box-shadow: 0 0 0 1px var(--vi-purple-color1);
      box-sizing: border-box;
      user-select: none;
      cursor: pointer;
      transition: all 0.2s ease 0s;

      &:hover {
        background-color: var(--neko-content-bg-color-s);
      }
    }

    .neko-apis-list-scroll {
      width: 100%;
      height: calc(100% - 44px - 38px);
      --vi-scroll-width: 100%;
      --vi-scroll-height: 100%;
    }
  }
}
</style>