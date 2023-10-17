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


export function getUserInfo () {
  if (fs.existsSync(userPath)) {
    const userInfo = JSON.parse(fs.readFileSync(userPath, 'utf-8'))
    return userInfo
  }
  return null
}

export function updateUserInfo (info: any) {
  generateNewDir()
  fs.writeFileSync(userPath, JSON.stringify(info))
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