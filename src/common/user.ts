import fs from "fs";
import path from "path";

let infoPath = process.env.APPDATA || (process.platform == "darwin" ? process.env.HOME + "/Library/Preferences" : process.env.HOME + "/.local/share")
console.log(process.execPath)
let resourceUserPath = path.join(process.execPath, "./user.json");
let userPath = path.join(infoPath, "neko-post/user.json");

if (!fs.existsSync(userPath)) {
  let filePath = path.join(infoPath, "neko-post");
  if (!fs.existsSync(filePath)) fs.mkdirSync(filePath)
  console.log(resourceUserPath, userPath)
//   fs.copyFileSync(resourceUserPath, userPath);
// 从网络下载
}