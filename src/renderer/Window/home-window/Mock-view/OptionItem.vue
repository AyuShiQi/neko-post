<template>
  <div class="func-item">
    <div class="drag-item">
    </div>
    <div class="drag-content" @mousedown="handleIgnoreMousedown">
      <div class="func-item__line">
        <vi-select
        v-model="opt.method"
        placeholder="请选择匹配方法"
        type="button"
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
        <vi-input type="button" v-model="opt.statusCode">
          <template v-slot:prefix>
            响应码
          </template>
        </vi-input>
      </div>
      <div class="func-item__return-text" contenteditable v-html="opt.response"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { handleError } from 'vue';

const props = defineProps<{
  opt: {
    method: number,
    statusCode: number,
    response: string
  }
}>()

function handleIgnoreMousedown (e: Event) {
  e.stopPropagation()
}
</script>

<style lang="less" scoped>
.func-item {
  position: relative;
  width: 428px;
  box-shadow: inset 0 0 0 1px var(--neko-white-border-color);
  border-radius: 5px;

  .drag-item {
    position: absolute;
    left: -20px;
    top: 50%;
    margin-top: -20px;
    width: 20px;
    height: 40px;
    border-radius: 5px 0 0 5px;
    background-color: var(--neko-bg-color);
    cursor: pointer;
  }

  .drag-content {
    display: flex;
    // width: 80%;
    gap: 8px;
    padding: 10px;
    background-color: var(--neko-bg-color);
    backdrop-filter: blur(5px);
    flex-direction: column;
    align-items: center;
    border-radius: 5px;

    .func-item__line {
      display: flex;
      gap: 8px;

      .neko-input-select {
        --vi-select-list-height: 100px;
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

    .func-item__return-text {
      width: 408px;
      min-height: 100px;
      padding: 8px;
      box-shadow: inset 0 0 0 1px var(--neko-white-border-color);
      border-radius: 5px;
      box-sizing: border-box;
      outline: none;
    }
  }
}
</style>