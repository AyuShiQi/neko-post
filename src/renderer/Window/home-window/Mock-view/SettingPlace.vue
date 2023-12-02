<template>
  <div class="workspace-content_setting">
    <!-- 重命名 -->
    <vi-form
    class="workplace-form"
    v-if="mockStore.mockList.target.gid !== null"
    @submit="handleUpdatePath">
      <template v-slot="{ submit }">
        <vi-form-item :rules="[{
          rule: /./,
          info: '不可为空'
        },
        {
          rule: /^[a-zA-Z0-9_\-]+$/,
          info: '只能包含字母、数字、下划线、中划线'
        }]">
          <vi-input placeholder="请输入新路径" type="button" v-model="path" name="path"></vi-input>
        </vi-form-item>
        <vi-button
        color="green" @click="submit"
        :disabled="path === mockStore.mockList.target.path">修改路径</vi-button>
      </template>
    </vi-form>
    <vi-form class="workplace-form"
    @submit="handleUpdateTitle">
      <template v-slot="{ submit }">
        <vi-form-item :rules="[{
          rule: /./,
          info: '不可为空'
        }]">
          <vi-input placeholder="请输入新备注" type="button" v-model="title" name="title"></vi-input>
        </vi-form-item>
        <vi-button
        color="green" @click="submit"
        :disabled="title === mockStore.mockList.target.title">修改备注</vi-button>
      </template>
    </vi-form>
    <!-- 删除 -->
    <vi-button color="red" @click="openClickSure" v-if="mockStore.mockList.target.gid !== null">删除路径</vi-button>
    <vi-dialog class="neko-workplace-delete-dialog"
    title="删除提醒"
    @sure="handleDelete"
    v-model="openDeleteDialog" blur>
      是否要删除该路径？（注意：该路径下所有子路径都将被删除）
    </vi-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useMockStore } from '@/renderer/store'
import { globalOberver } from '@/common/observer'
import { ViMessage } from 'viog-ui'
const mockStore = useMockStore()

const path = ref(mockStore.mockList.target.path)
const title = ref(mockStore.mockList.target.title)
const openDeleteDialog = ref(false)

globalOberver.on('update-mid', () => {
  path.value = mockStore.mockList.target.path
  title.value = mockStore.mockList.target.title
})

function openClickSure () {
  openDeleteDialog.value = true
}

async function handleDelete () {
  const res = await mockStore.deleteMock(mockStore.mid)
  ViMessage.append(res.msg, 2000)
}

async function handleUpdatePath (result: boolean, resMap: any, { getSubmitFeedback }) {
  if (!result) return
  const res = await mockStore.updateMockPath(mockStore.mid, path.value)
  if (res.code === 200) {
    ViMessage.append('修改成功', 2000)
    mockStore.loadMockList()
  } else if (res.code === 501) {
    const feedbackMap = new Map<string, string>()
    feedbackMap.set('path', '路径已存在')
    getSubmitFeedback(feedbackMap)
  } else {
    ViMessage.append(res.msg, 2000)
  }
}

async function handleUpdateTitle (result: boolean) {
  if (!result) return
  const res = await mockStore.updateMockTitle(mockStore.mid, title.value)
  if (res.code === 200) {
    ViMessage.append('修改成功', 2000)
    mockStore.loadMockList()
  } else {
    ViMessage.append(res.msg, 2000)
  }
}
</script>

<style lang="less" scoped>
  .workspace-content_setting {
    width: 100%;
    height: calc(100% - 68px);
    padding: 6px;
    box-sizing: border-box;

    .workplace-form {
      display: flex;
      margin-bottom: 8px;
      gap: 8px;

      .vi-button {
        height: 2.2em;
      }
    }
  }
</style>

<style>
  .neko-workplace-delete-dialog {
    --vi-dialog-background-color: rgba(50, 50, 59, 0.708);
  }
</style>