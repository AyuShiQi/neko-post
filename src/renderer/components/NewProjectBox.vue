<template>
  <div class="neko-new-project-box" v-if="props.modelValue">
    <div class="box-content">
      <vi-form class="neko-new-project-box__form" @submit="handleSubmit">
        <template v-slot="{ submit }">
          <div class="form-title">
            <h6>创建新项目</h6>
            <svg viewBox="0 0 20 20" @click="handleShutdown">
              <path d="M2 2 L18 18 M2 18 L18 2"></path>
            </svg>
          </div>
          <div class="form-content">
            <vi-form-item
            :rules="[
              {
                rule: /^\S{4,32}$/,
                info: '项目名称应由4-32位非空格字符组成'
              }
            ]">
              <vi-input placeholder="输入项目名称" name="pname" v-model="pname"/>
            </vi-form-item>
          </div>
          <vi-button
          color="purple"
          class="submit-button"
          @click="submit">创建</vi-button>
        </template>
      </vi-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useProfileStore } from '../store'
import { createProject } from '../network/proj'
import { ViMessage } from 'viog-ui'
const profileStore = useProfileStore()
const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const pname = ref()

function handleSubmit (resMap: any, res: boolean, { getSubmitFeedback }) {
  if (!res) return
  console.log(res)
  // 查找这个项目是否存在
  const proj = profileStore.findProjectWithPname(pname.value)
  if (proj) {
    const resMap = new Map<string, string>()
    resMap.set('pname', '已存在相同项目名')
    getSubmitFeedback(resMap)
  } else {
    // 创建
    createProject(profileStore.token, profileStore.uid, pname.value).then(val => {
      // 更新列表
      profileStore.updateProjectList()
      if (val.code === 200) {
        ViMessage.append('创建成功', 2000)
        handleShutdown()
      } else {
        ViMessage.append('创建失败，请重试！', 2000)
      }
    })
  }
}

function handleShutdown () {
  emit('update:modelValue', false)
}
</script>

<style lang="less" scoped>
  .neko-new-project-box {
    position: fixed;
    z-index: 40;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--vi-purple-color5);

    .box-content {
      position: absolute;
      top: calc(50% - 120px);
      left: calc(50% - 200px);
      width: 500px;
      height: 280px;
      padding: 16px;
      background-color: var(--neko-content-bg-color);
      box-shadow:  0 0 6px 0 var(--vi-purple-color5),
      0 0 10px 0 var(--vi-purple-color5);
      backdrop-filter: blur(20px);
      border-radius: 5px;
      box-sizing: border-box;
    }

    .neko-new-project-box__form {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .form-title {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;

        svg {
          width: 10px;
          stroke-width: 2;
          stroke-linecap: round;
          stroke: var(--neko-white-font-color);
          cursor: pointer;

          &:hover {
            stroke: var(--neko-white-border-color);
          }
        }
      }

      .form-content {
        width: 100%;
        padding: 16px 0;
        flex: 1;

        // --vi-background-color: #fff;
        --vi-background-color-deep: #fff;
        --vi-background-color-deeper: #fff;
      }

      .submit-button {
        align-self: flex-end;
      }
    }
  }
</style>