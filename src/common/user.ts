import fs from "fs";
import path from "path";

import { getUserBase } from '@/renderer/network/user'
/**
 * 用户信息文件存放位置
 */
let infoPath = process.env.APPDATA || (process.platform == "darwin" ? process.env.HOME + "/Library/Preferences" : process.env.HOME + "/.local/share")
let userPath = path.join(infoPath, "neko-post/user.json");

console.log(userPath)
if (!fs.existsSync(userPath)) {
  let filePath = path.join(infoPath, "neko-post");
  if (!fs.existsSync(filePath)) fs.mkdirSync(filePath)
//   fs.copyFileSync(resourceUserPath, userPath);
// 从网络下载
  getUserBase()
}