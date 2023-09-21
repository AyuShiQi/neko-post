<template>
  <div class="neko-apis-workspace">
    <div class="workspce-header">
      <div></div>
      <div></div>
    </div>
    <vi-scroll class="workspace-content">
      <!-- 发送部分 -->
      <div class="workspace-content__send">
        <vi-input type="plain" placeholder="请输入接口地址"
        class="workspace-content__send-input">
          <template v-slot:prefix>
            <vi-select class="neko-input-select">
              <vi-option class="get" value="get">GET</vi-option>
              <vi-option class="put" value="put">PUT</vi-option>
              <vi-option class="post" value="post">POST</vi-option>
              <vi-option class="head" value="head">HEAD</vi-option>
              <vi-option class="patch" value="patch">PATCH</vi-option>
              <vi-option class="delete" value="delete">DELETE</vi-option>
              <vi-option class="options" value="options">OPTIONS</vi-option>
              <vi-option class="connect" value="connect">CONNECT</vi-option>
            </vi-select>
          </template>
        </vi-input>
        <vi-button class="workspace-content__send-btn" color="purple">Send</vi-button>
      </div>
      <!-- 请求部分 -->
      <div class="workspace-content__request">
        <p>Request</p>
        <vi-nav>
          <vi-nav-item>Params</vi-nav-item>
          <vi-nav-item>Authorization</vi-nav-item>
          <vi-nav-item>Headers</vi-nav-item>
          <vi-nav-item>Body</vi-nav-item>
        </vi-nav>
        <div class="nav-content">
          
        </div>
      </div>
    </vi-scroll>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less">
  .neko-apis-workspace {
    .vi-select-box  {
      backdrop-filter: blur(20px);
    }
  }
</style>

<style lang="less" scoped>
  .neko-apis-workspace {
    --vi-icon-color: var(--neko-white-border-color);
    --vi-link-color: var(--neko-white-font-color);
    --vi-font-color: var(--neko-white-font-color);
    --vi-background-color-base: transparent;
    --vi-background-color-deep: var(--neko-white-font-color);
    --vi-background-color: var(--neko-white-border-color);
    width: 100px;
    height: 100%;
    flex: 1;
    // background-color: var(--neko-main-bg-color);

    .workspce-header {
      width: 100%;
      height: 40px;
      background-color: var(--neko-content-bg-color);
      border-left: 1px solid var(--neko-main-bg-color);
      border-bottom: 1px solid var(--neko-main-bg-color);
      box-sizing: border-box;
    }

    .workspace-content {
      --vi-scroll-width: 100%;
      --vi-scroll-height: calc(100% - 40px);
      background-color: var(--neko-content-bg-color);

      .workspace-content__send {
        display: flex;
        height: 60px;
        padding: 10px;
        align-items: center;
        gap: 16px;
        box-sizing: border-box;

        .workspace-content__send-input {
          flex: 1;
          --vi-font-size: 16px;
          --vi-input-width: 100%;
          --vi-input-height: 40px;
          --vi-input-prefix-width: 100px;
          --vi-select-list-width: 120px;
          --vi-icon-color: var(--neko-white-border-color);
          --vi-link-color: var(--neko-white-font-color);
          --vi-background-color-base: transparent;
          --vi-background-color-deep: var(--neko-white-font-color);
          --vi-background-color: var(--neko-white-border-color);
          .neko-input-select {
            .vi-option {
              font-weight: 600;
              --vi-background-color: var(--neko-bg-color);
            }

            .post {
              color: var(--vi-yellow-color1);
            }

            .get {
              color: var(--vi-green-color1);
            }

            .put {
              color: var(--vi-blue-color1);
            }

            .head {
              color: var(--vi-golden-color2);
            }

            .delete {
              color: var(--vi-red-color1);
            }

            .connect {
              color: var(--vi-pink-color1);
            }

            .options {
              color: var(--vi-green-color4);
            }

            .trace {
              color: var(--vi-yellow-color4);
            }

            .patch {
              color: var(--vi-blue-color3);
            }
          }
        }

        .workspace-content__send-btn {
          width: 100px;
          height: 42px;
          font-weight: 600;
          --vi-font-size: 16px;
          --vi-purple-color2: var(--neko-purple-color);
          --vi-purple-color3: var(--vi-purple-color6);
          outline: none;
        }
      }

      .workspace-content__request {
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
      }
    }
  }
</style>