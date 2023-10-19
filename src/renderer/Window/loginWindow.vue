<template>
  <div class="neko-login-content">
    <vi-link color="purple"
    class="change-method-button"
    @click="changeMethod"
    v-if="loginView">{{ registerView ? '去登录' : '去注册' }}</vi-link>
    <vi-form v-if="loginView && !registerView" class="neko-login-content_form" @submit="handleLoginSubmit">
        <template v-slot:default="{ submit }">
            <p>欢迎使用</p>
            <vi-form-item
            trunc
            :rules="usernameRules">
                <vi-input
                v-model="username"
                name="username"
                type="button"
                placeholder="请输入账号"></vi-input>
            </vi-form-item>
            <vi-form-item
            :rules="passwordRules">
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
    <vi-form v-if="loginView && registerView" class="neko-login-content_form" @submit="handleRegisterSubmit">
        <template v-slot:default="{ submit }">
            <p>账号注册</p>
            <vi-form-item
            trunc
            auto
            :rules="usernameRegisterRules">
                <vi-input
                v-model="registerUsername"
                name="username"
                type="button"
                placeholder="请输入账号"></vi-input>
            </vi-form-item>
            <vi-form-item
            trunc
            auto
            :rules="passwordRegisterRules">
                <vi-input
                v-model="registerPassword"
                name="password"
                password
                type="button"
                placeholder="请输入密码"></vi-input>
            </vi-form-item>
            <vi-form-item
            auto
            :rules="[
              {
                rule: () => {
                    return confirmRegisterPassword === registerPassword
                },
                info: '两次密码不一致'
              }
            ]">
                <vi-input
                v-model="confirmRegisterPassword"
                name="password"
                password
                type="button"
                placeholder="请再次输入密码"></vi-input>
            </vi-form-item>
            <vi-button @click="submit">注册</vi-button>
        </template>
    </vi-form>
    <vi-dialog v-model="dialogView" @sure="handleSure">注册成功，是否直接登录</vi-dialog>
    <vi-button
    v-if="!loginView"
    color="purple"
    class="neko-login-content__button"
    @click="goToLogin">点击登录</vi-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useProfileStore } from '../store'
import { createNewUser, login } from '../network/user'
import { getUserInfo } from '@/common/user'
import { usernameRules, passwordRules, usernameRegisterRules, passwordRegisterRules } from '@/rules/user'
import { ViMessage } from 'viog-ui'

const profileStore = useProfileStore()

const loginView = ref(false)
const registerView = ref(false)
const dialogView = ref(false)

const userInfo = getUserInfo()
const username = ref(userInfo.username)
const password = ref(userInfo.password)
const registerUsername = ref()
const registerPassword = ref()
const confirmRegisterPassword = ref()

function goToLogin () {
  loginView.value = true
}

function changeMethod () {
  registerView.value = !registerView.value
}

function handleLoginSubmit (fromMap: Map<string, string>, res: boolean) {
  // if (res) profileStore.isLogin = true
  login(username.value, password.value).then(val => {
    if (val.code === 200) {
      ViMessage.append('登陆成功')
      profileStore.isLogin = true
    }
  })
}

function handleRegisterSubmit (fromMap: Map<string, string>, res: boolean, { getSubmitFeedback }) {
  if (!res) return
  // if (res) profileStore.isLogin = true
  createNewUser(registerUsername.value, registerPassword.value).then(val => {
    if (val.code === 200) {
      dialogView.value = true
    } else if (val.code === 500) {
      const feedBackMap = new Map<string, string>()
      feedBackMap.set('username', val.msg)
      getSubmitFeedback(feedBackMap)
    }
  })
}

function handleSure () {
  profileStore.isLogin = true
  dialogView.value = false
}
</script>

<style lang="less" scoped>
  .neko-login-content {
    position: relative;
    display: flex;
    width: 100%;
    height: calc(100% - 40px);
    align-items: center;
    justify-content: center;
    background-color: var(--neko-content-bg-color);

    .change-method-button {
        position: absolute;
        top: 8px;
        right: 8px;
    }

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