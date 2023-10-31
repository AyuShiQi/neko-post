<template>
  <div class="neko-apis-workspace">
    <vi-tab-card-group
    class="workspce-header"
    type="button"
    v-model="apiStore.aid"
    @delete="handleTabDelete">
      <vi-tab-card
      v-for="item of apiStore.tabList.values()"
      :value="item.aid"
      :key="item"
      :class="[
        {
          'neko-tab-card-wating-update': apiStore.isWatingUpdate(item.aid)
        }
      ]">
        <template v-slot:icon>
          <MethodSpan :methods="(item.method as any)"/>
        </template>
        {{ item.title }}
      </vi-tab-card>
    </vi-tab-card-group>
    <vi-scroll class="workspace-content" v-if="apiStore.aid">
      <!-- 发送部分 -->
      <div class="workspace-content__send">
        <vi-input
        v-model="apiStore.apiList.target.url"
        @update:modelValue="handleUpdate"
        type="plain"
        placeholder="请输入接口地址"
        class="workspace-content__send-input">
          <template v-slot:prefix>
            <vi-select
            v-model="apiStore.apiList.target.method"
            @update:modelValue="handleUpdate"
            class="neko-input-select">
              <vi-option class="get" :value="null">未知</vi-option>
              <vi-option class="get" :value="0">GET</vi-option>
              <vi-option class="put" :value="1">PUT</vi-option>
              <vi-option class="post" :value="2">POST</vi-option>
              <vi-option class="head" :value="3">HEAD</vi-option>
              <vi-option class="patch" :value="4">PATCH</vi-option>
              <vi-option class="delete" :value="5">DELETE</vi-option>
              <vi-option class="options" :value="6">OPTIONS</vi-option>
              <vi-option class="connect" :value="7">CONNECT</vi-option>
            </vi-select>
          </template>
        </vi-input>
        <vi-button class="workspace-content__send-btn" color="purple">Send</vi-button>
      </div>
      <!-- 请求部分 -->
      <div class="workspace-content__request">
        <vi-nav @change="handleNavChange">
          <vi-nav-item>Params</vi-nav-item>
          <vi-nav-item>Authorization</vi-nav-item>
          <vi-nav-item>Headers</vi-nav-item>
          <vi-nav-item>Body</vi-nav-item>
        </vi-nav>
        <div class="nav-content">
          <ParamsContent v-if="navChoose === 0"></ParamsContent>
          <AuthorizationContent v-else-if="navChoose === 1"></AuthorizationContent>
          <HeadersContent v-else-if="navChoose === 2"></HeadersContent>
          <BodyContent v-else></BodyContent>
        </div>
      </div>
    </vi-scroll>
    <div class="workspace-content-temp" v-else>
      暂无打开接口
    </div>
    <vi-dialog
    v-model="saveDialog"
    class="neko-save-dialog"
    blur
    @sure="handleSave">
      该项目暂未保存，是否保存？
    </vi-dialog>
  </div>
</template>

<script lang="ts" setup>
  import MethodSpan from '@/renderer/components/MethodSpan.vue'
  import ParamsContent from './ParamsContent.vue'
  import AuthorizationContent from './AuthorizationContent.vue'
  import HeadersContent from './HeadersContent.vue'
  import BodyContent from './BodyContent.vue'
  import { ref } from 'vue'
  import { useApiStore } from '@/renderer/store'
  import { ViMessage } from 'viog-ui'
  const apiStore = useApiStore()

  let deleteAid: string
  const navChoose = ref(0)
  const saveDialog = ref(false)

  function handleNavChange (id: 0) {
    // console.log(id)
    navChoose.value = id
  }

  function handleUpdate () {
    apiStore.addWatingUpdateTab(apiStore.aid)
  }

  function handleTabDelete (aid: string) {
    // 如果在待更新列表中，需要先提醒一下（还未保存，是否保存）操作跳转
    if (apiStore.isWatingUpdate(aid)) {
      deleteAid = aid
      saveDialog.value = true
    } else {
      // 观察是不是当前打开的
      apiStore.removeTab(aid)
      apiStore.aid = apiStore.getTabApi()
    }
  }

  function handleSave () {
    if (!deleteAid) return
    const target = apiStore.tabList.get(deleteAid)
    if (target) {
      // 更新
      apiStore.updateApi(target).then(val => {
        if (val.code === 200) {
          // 从待更新列表删除
          apiStore.removeWatingUpdateTab(deleteAid)
          apiStore.removeTab(deleteAid)
          deleteAid = undefined
          // 观察是不是当前打开的
          apiStore.aid = apiStore.getTabApi()
        } else {
          ViMessage.append('保存失败！', 2000)
        }
      })
    }
  }
</script>

<style lang="less">
  .neko-apis-workspace {
    .vi-select-box  {
      backdrop-filter: blur(20px);
    }
  }

  .neko-save-dialog {
    --vi-dialog-background-color: var(--vi-purple-color6);
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
    color: var(--vi-font-color);
    width: 100px;
    height: 100%;
    flex: 1;

    .workspce-header {
      width: 100%;
      height: 40px;
      background-color: var(--neko-content-bg-color);
      box-sizing: border-box;
      --vi-tab-card-height: 40px;

      --vi-background-color-solid: var(--neko-tab-color-s);
      --vi-background-color-deep: var(--neko-tab-color);
      --vi-bg-color-deep-alpha: var(--neko-bg-color-s);
      --vi-bg-color-deeper-alpha: var(--neko-main-bg-color);
      color: var(--neko-grey-font-color);

      .neko-tab-card-wating-update {
        position: relative;

        &::after {
          position: absolute;
          content: "";
          top: 4px;
          right: 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--neko-warning-bg-color);
        }
      }
    }

    .workspace-content {
      --vi-scroll-width: 100%;
      --vi-scroll-height: calc(100% - 40px);
      background-color: var(--neko-content-bg-color);
      color: var(--neko-white-border-color);

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

        .nav-content {
          margin-top: 16px;
        }
      }
    }

    .workspace-content-temp {
      display: flex;
      width: 100%;
      height: calc(100% - 40px);
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
  }
</style>