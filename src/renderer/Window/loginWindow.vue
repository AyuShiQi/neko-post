<template>
  <div class="neko-login-content">
    <vi-form v-if="loginView" class="neko-login-content_form" @submit="handleSubmit">
        <template v-slot:default="{ submit }">
            <p>欢迎使用</p>
            <vi-form-item
            :rules="[
                {
                    rule: /./,
                    info: '账号不可为空'
                }
            ]">
                <vi-input
                v-model="username"
                name="username"
                type="button"
                placeholder="请输入账号"></vi-input>
            </vi-form-item>
            <vi-form-item
            :rules="[
                {
                    rule: /./,
                    info: '密码不可为空'
                }
            ]">
                <vi-input
                v-model="password"
                name="password"
                password
                type="button"
                show-password
                placeholder="请输入密码"></vi-input>
            </vi-form-item>
            <vi-button @click="submit">登录</vi-button>
        </template>
    </vi-form>
    <vi-button
    v-else
    color="purple"
    class="neko-login-content__button"
    @click="goToLogin">点击登录</vi-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useProfileStore } from '../store'
import { createNewUser, login } from '../network/user'
const profileStore = useProfileStore()
import { getUserInfo } from '@/common/user'
const loginView = ref(false)

const userInfo = getUserInfo()
const username = ref(userInfo.username)
const password = ref(userInfo.password)

function goToLogin () {
  loginView.value = true
}

function handleSubmit (fromMap: Map<string, string>, res: boolean) {
  // if (res) profileStore.isLogin = true
  login(username.value, password.value).then(val => {
    if (val.code === 200) profileStore.isLogin = true
  })
}
</script>

<style lang="less" scoped>
  .neko-login-content {
    display: flex;
    width: 100%;
    height: calc(100% - 40px);
    align-items: center;
    justify-content: center;
    background-color: var(--neko-content-bg-color);

    .neko-login-content_form {
        display: flex;
        width: 50%;
        height: 36%;
        align-items: center;
        flex-direction: column;
        --vi-form-item-gap: 12px;
        --vi-background-color-deep: var(--neko-content-bg-color-solid);
        --vi-background-color: var(--neko-content-bg-color);
        --vi-background-color-middle: var(--neko-grey-font-color);
        --vi-background-color-deeper: var(--neko-white-border-color);

        > p {
            font-size: 24px;
            flex: 1;
        }

        .vi-button {
            margin-top: 10px;
            width: 200px;
        }
    }

    .neko-login-content__button {
        width: 50%;
        height: 3.2em;
        font-weight: 600;
        letter-spacing: .5em;
    }
  }
</style>