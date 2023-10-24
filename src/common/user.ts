import fs from "fs";
import path from "path";

import { getPublicUserJson } from '@/renderer/network/public'
/**
 * 用户信息文件存放位置
 */
let infoPath = process.env.APPDATA || (process.platform == "darwin" ? process.env.HOME + "/Library/Preferences" : process.env.HOME + "/.local/share")
// 用户登录信息
let userPath = path.join(infoPath, "neko-post/user.json");
let filePath = path.join(infoPath, "neko-post");

generateNewFile()

interface UserInfo {
  username?: string,
  password?: string,
  token?: string,
  pid?: string
}


export function getUserInfo () {
  if (fs.existsSync(userPath)) {
    const userInfo = JSON.parse(fs.readFileSync(userPath, 'utf-8'))
    return userInfo as UserInfo
  }
  return null
}

/**
 * 用户信息全部修改
 * @param info 信息 
 */
export function updateUserInfo (info: UserInfo) {
  generateNewDir()
  fs.writeFileSync(userPath, JSON.stringify(info))
}

/**
 * 修改添加单项信息
 * @param info 信息
 */
export function addUserInfo (info: UserInfo) {
  generateNewDir()
  let userInfo = getUserInfo()
  if (!userInfo) userInfo = info
  for (const name in info) {
    userInfo[name] = info[name]
  }
  fs.writeFileSync(userPath, JSON.stringify(userInfo))
  // console.log(userInfo, 'ok')
}

function generateNewDir () {
  if (!fs.existsSync(filePath)) fs.mkdirSync(filePath)
}

function generateNewFile () {
  if (!fs.existsSync(userPath)) {
    let filePath = path.join(infoPath, "neko-post");
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath)
    // 从网络下载
    getPublicUserJson().then(data => {
      // console.log(JSON.stringify(data))
      fs.writeFileSync(userPath, JSON.stringify(data))
    })
  }
}