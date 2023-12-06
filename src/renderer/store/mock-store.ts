import { reactive, ref, watch, computed, Ref } from 'vue'
import { defineStore } from 'pinia'
import { useProfileStore } from './profile-store'
import type { Mock, MockTreeNode } from '../network'
import { getMockList, saveMock, updateOpt, updatePath, updateTitle, delMock } from '../network/mock'
import { globalOberver } from '@/common/observer'
import type { CreateNewServeReturn } from '@/common/mock-server'

/**
 * 用户信息注册
 */
export const useMockStore = defineStore('mock', () => {
  const profileStore = useProfileStore()
  // 当前选中的mock id号
  const mid = ref()
  // 服务port
  const port = ref(9234)
  // 是否正在更新target
  const isChangeTarget = ref(false)
  const serverStart = ref(false)
  const currentServer: Ref<CreateNewServeReturn> = ref()
  const mockList = reactive({
    // 渲染的总list表，在前端生成
    list: [] as Mock[],
    tree: null as MockTreeNode,
    target: {} as Mock,
  })

  const pathList = computed(() => {
    const visited = new Set<string>()
    const path = [] as string[]
    findParent(mid.value)
    // console.log('path', path)
    return path
    function findParent (gid: string) {
      if (visited.has(gid) || gid === null) return
      visited.add(gid)
      for (const mock of mockList.list) {
        if (mock.mid === gid) {
          path.unshift(mock.path)
          findParent(mock.gid)
          break
        }
      }
    }
  })
  /**
   * 已打开mock列表
   */
  const tabList = reactive(new Map()) as Map<string, Mock>
  /**
   * 待更新mock列表
   */
  const watingUpdateTabList = reactive(new Set()) as Set<string>

  /**
   * 判断一个接口是否待更新
   * @params aid 接口id
   */
  const isWatingUpdate = computed(() => {
    return (mid: string) => watingUpdateTabList.has(mid)
  })

  watch(mid, () => {
    loadTargetMock()
    isChangeTarget.value = true
    globalOberver.emit('update-mid', mid.value)
  })

  // 监听pid改变
  profileStore.registerPid(updateNewProjectMock)
  updateNewProjectMock()

  /**
   * 更新新的项目Api列表
   */
  async function updateNewProjectMock () {
    // console.log('通过pid或者加载project状态进入清空tablist')
    // tabList改变
    await updateInfo()
    // 更改为根路径
    // console.log('pick root')
    mid.value = mockList.tree?.val?.mid
    // 关闭mockServer
    if (currentServer.value) currentServer.value.close(() => {
      serverStart.value = false
    })
  }

  /**
   * 更新mock列表
   */
  async function updateInfo () {
    // 重新获取list
    await loadMockList()
  }

  /**
   * 加载mockList
   */
  async function loadMockList () {
    const { token, isLoadedProject, pid, uid } = profileStore
    if (isLoadedProject) {
      const val = await getMockList(token, uid, pid)
      if (val.code === 200) {
        mockList.list = formatMockList(val.data)
        mockList.tree = parseMockTree(val.data) // 转换mock树
        // console.log('tree', mockList.tree)
        loadTargetMock()
      }
      return val
    } else return { code: 500, msg: '无加载项目', data: null}
  }

  function parseMockTree (mocks: Mock[]): MockTreeNode {
    const visited = new Array(mocks.length).fill(false)
    return parseTree(null, null)[0]
    function parseTree (gid: string, parentNode: MockTreeNode): MockTreeNode[] {
      const target = [] as MockTreeNode[]
      for (let i = 0; i < mocks.length; i++) {
        if (visited[i]) continue
        const cur = mocks[i]
        if (cur.gid === gid) {
          visited[i] = true
          const nowNode = {
            val: cur,
            parentNode,
            children: null
          }
          nowNode.children = parseTree(cur.mid, nowNode)
          target.push(nowNode)
        }
      }
      return target
    }
  }

  /**
   * 加载target
   * @param newAid 新的加载aid
   */
  function loadTargetMock (newMid?: string) {
    if (newMid) mid.value = newMid
    if (!mid.value) return
    for (const mock of mockList.list) {
      if (mock.mid === mid.value) {
        // 把目标变为对象
        // formatMock(mock)
        mockList.target = mock
        return
      }
    }
    mockList.target = null
  }

  /**
   * 格式化mock
   * @param mock
   */
  function formatMock (mock: Mock) {
    // console.log('format')
    if (!(mock.option instanceof Object)) {
      mock.option = JSON.parse(mock.option) ?? []
    }
    return mock
  }

  function formatMockList (mocks: Mock[]) {
    return mocks.map(item => formatMock(item))
  }

  async function createMock (title: string, path: string) {
    return saveMock(profileStore.token, profileStore.uid, profileStore.pid, title, path, mid.value)
  }

  /**
   * 更新接口信息
   * @param api api对象
   * @returns
   */
  function updateMockOpt (mock: string | Mock) {
    let target: Mock
    if (typeof mock === 'string') target = findMockWithMid(mock)
    else target = mock
    // console.log('update api', target)
    if (!target) return Promise.resolve({ code: 500, msg: '', data: null })
    return updateOpt(profileStore.token, profileStore.uid, profileStore.pid, target.mid, target.gid, JSON.stringify(target.option))
  }

  function updateMockTitle (mock: string | Mock, title: string) {
    let target: Mock
    if (typeof mock === 'string') target = findMockWithMid(mock)
    else target = mock
    if (!target) return Promise.resolve({ code: 500, msg: '', data: null })
    return updateTitle(profileStore.token, profileStore.uid, profileStore.pid, target.mid, target.gid, title)
  }

  function updateMockPath(mock: string | Mock, path: string) {
    let target: Mock
    if (typeof mock === 'string') target = findMockWithMid(mock)
    else target = mock
    if (!target) return Promise.resolve({ code: 500, msg: '', data: null })
    return updatePath(profileStore.token, profileStore.uid, profileStore.pid, target.mid, target.gid, path)
  }

  /**
   * 添加待更新的列表
   * @param aid 
   */
  function addWatingUpdateTab (mid: string) {
    watingUpdateTabList.add(mid)
  }

  /**
   * 溢出待更新的列表
   * @param mid 
   */
  function removeWatingUpdateTab (mid: string) {
    watingUpdateTabList.delete(mid)
  }

  /**
   * 更新全部待更新接口
   */
  function updateAllWatingUpdate () {
    for (const mid of watingUpdateTabList.values() as any) {
      updateMockOpt(mid)
      removeWatingUpdateTab(mid)
    }
  }

  /**
   * 通过aid找到对应的接口信息（包括基础配置，但不包括组）
   * @param mid 
   */
  function findMockWithMid (mid: string) {
    // 基础配置匹配
    for (const mock of mockList.list) {
      if (mock.mid === mid) return mock
    }
    return null
  }

  /**
   * 删除接口
   * @param dmid 接口id 
   * @returns
   */
  async function deleteMock (dmid: string) {
    const target = findMockWithMid(dmid)
    if (!target) return { code: 500, msg: '未找到对应mock', data: null }
    const val = await delMock(profileStore.token, profileStore.uid, profileStore.pid, target.gid, dmid)
    if (val.code === 200) {
      removeWatingUpdateTab(dmid)
      loadMockList()
      mid.value = target.gid
    }
    return val
  }

  return {
    mid,
    port,
    pathList,
    serverStart,
    currentServer,
    mockList,
    tabList,
    watingUpdateTabList,
    isWatingUpdate,
    formatMock,
    updateMockOpt,
    updateMockPath,
    loadMockList,
    createMock,
    addWatingUpdateTab,
    removeWatingUpdateTab,
    updateAllWatingUpdate,
    updateMockTitle,
    deleteMock
  }
})