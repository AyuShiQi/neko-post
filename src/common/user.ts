import fs from "fs";
import path from "path";

import { getPublicUserJson } from '@/renderer/network/public'
/**
 * 用户信息文件存放位置
 */
let infoPath = process.env.APPDATA || (process.platform == "darwin" ? process.env.HOME + "/Library/Preferences" : process.env.HOME + "/.local/share")
// 用户登录信息
let userPath = path.join(infoPath, "neko-post/user.json");

if (!fs.existsSync(userPath)) {
  let filePath = path.join(infoPath, "neko-post");
  if (!fs.existsSync(filePath)) fs.mkdirSync(filePath)
  // 从网络下载
  getPublicUserJson().then(data => {
    console.log(JSON.stringify(data))
    fs.writeFileSync(userPath, JSON.stringify(data))
  })
}