<template>
  <div class="neko-form-box" v-if="props.modelValue">
    <div class="box-content">
      <vi-form class="neko-form-box__form" @submit="handleSubmit">
        <template v-slot="{ submit, getSubmitFeedback }">
          <div class="form-title">
            <h6>{{ props.title }}</h6>
            <svg viewBox="0 0 20 20" @click="handleShutdown">
              <path d="M2 2 L18 18 M2 18 L18 2"></path>
            </svg>
          </div>
          <div class="form-content">
            <slot :submit="submit" :getSubmitFeedback="getSubmitFeedback">
            </slot>
          </div>
          <vi-button
          color="purple"
          class="submit-button"
          @click="submit">{{ btnTitle }}</vi-button>
        </template>
      </vi-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean,
  title: string,
  btnTitle: string
}>()
const emit = defineEmits(['update:modelValue', 'submit'])

/**
 * 处理创建框退出
 */
function handleShutdown () {
  emit('update:modelValue', false)
}

function handleSubmit (resMap: any, res: boolean, { getSubmitFeedback }) {
  emit('submit', res, getSubmitFeedback as (submitMap: Map<string, string>) => void)
}
</script>

<style lang="less" scoped>
  .neko-form-box {
    --neko-width: 500px;
    --neko-height: 280px;
    --neko-top-del: 120px;
    --neko-left-del: 200px;
    position: fixed;
    z-index: 40;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--vi-purple-color5);

    .box-content {
      position: absolute;
      top: calc(50% - var(--neko-top-del));
      left: calc(50% - var(--neko-left-del));
      width: var(--neko-width);
      height: var(--neko-height);
      padding: 16px;
      background-color: var(--neko-content-bg-color);
      box-shadow:  0 0 6px 0 var(--vi-purple-color5),
      0 0 10px 0 var(--vi-purple-color5);
      backdrop-filter: blur(20px);
      border-radius: 5px;
      box-sizing: border-box;
    }

    .neko-form-box__form {
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