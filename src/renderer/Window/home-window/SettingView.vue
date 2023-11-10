<template>
  <div class="neko-apis-setting">
    <vi-form class="neko-form" @submit="handleTitleSubmit">
      <template v-slot="{ submit }">
        <vi-form-item
        :rules="[
          {
            rule: /^\S{4,32}$/,
            info: '项目名称应由4-32位非空格字符组成'
          }
        ]">
          <div class="neko-form-item">
            <vi-input name="pname" v-model="pname" type="button"></vi-input>
            <vi-button :disabled="noModified" color="green" @click="submit">修改项目名</vi-button>
          </div>
        </vi-form-item>
      </template>
    </vi-form>
    <vi-button class="del-proj-btn" color="red" @click="deleteDialog = true">删除该项目</vi-button>
    <vi-dialog v-model="openTitleDialog" @sure="handleTitleSure">
      是否确认修改项目 {{ profileStore.projectList.target?.pname }} 标题为 {{ pname }}
    </vi-dialog>
    <vi-dialog v-model="deleteDialog" @sure="handleDeleteSure">
      是否删除项目 {{ profileStore.projectList.target?.pname }} ？
    </vi-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useProfileStore } from '@/renderer/store'
import { updateProjectTitle, deleteProject } from '@/renderer/network/proj'
import { ViMessage } from 'viog-ui'
const profileStore = useProfileStore()

// 待修改的
const pname = ref(profileStore.projectList.target.pname)
const openTitleDialog = ref(false)
const deleteDialog = ref(false)
const originPname = computed(() => profileStore.projectList.target.pname)
const noModified = computed(() => pname.value === profileStore.projectList.target.pname)

watch(originPname, () => {
  pname.value = originPname.value
})

function handleTitleSubmit (resMap: any, res: boolean, { getSubmitFeedback }) {
  if (!res || noModified.value) return
  const proj = profileStore.findProjectWithPname(pname.value)
  if (proj) {
    const feedbackMap = new Map<string, string>()
    feedbackMap.set('pname', '项目名已存在')
    getSubmitFeedback(feedbackMap)
  } else openTitleDialog.value = true
}

async function handleTitleSure () {
  const { token, uid, pid } = profileStore
  const val = await updateProjectTitle(token, uid, pid, pname.value)
  if (val.code === 200) {
    profileStore.updateProjectList()
    ViMessage.append('更新成功', 2000)
  } else {
    ViMessage.append('更新失败', 2000)
  }
}

async function handleDeleteSure () {
  const { token, uid, pid } = profileStore
  const val = await deleteProject(token, uid, pid)
  if (val.code === 200) {
    profileStore.updateProjectList()
    profileStore.pid = undefined
    ViMessage.append('删除成功', 2000)
  } else {
    ViMessage.append('删除失败', 2000)
  }
}
</script>

<style lang="less" scoped>
.neko-apis-setting {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;

  .neko-form {
    margin-bottom: 24px;

    .neko-form-item {
      display: flex;
      align-items: center;
      gap: 16px;
      --vi-background-color-deep: var(--neko-content-bg-color);
    }
  }
}
</style>