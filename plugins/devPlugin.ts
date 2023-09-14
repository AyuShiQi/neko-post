import { ViteDevServer } from "vite";

export let devPlugin = () => {
  return {
    name: "dev-plugin",
    configureServer(server: ViteDevServer) {
      require("esbuild").buildSync({
        entryPoints: ["./src/main/mainEntry.ts"],
        bundle: true,
        platform: "node",
        outfile: "./dist/mainEntry.js",
        external: ["electron"],
      });
      server.httpServer!.once("listening", () => {
        let { spawn } = require("child_process");
        let addressInfo = server.httpServer!.address();
        let httpAddress = `http://${(addressInfo as any).address}:${(addressInfo as any).port}`;
        // 通过swan启动一个electron进程
        let electronProcess = spawn(require("electron").toString(), ["./dist/mainEntry.js", httpAddress], {
          cwd: process.cwd(),
          stdio: "inherit",
        });
        // close事件是当接收到关闭事件，window-all-closed就是所有窗口都关闭事件
        electronProcess.on("close", () => {
          server.close();
          process.exit();
        });
      });
    },
  };
};

export const getReplacer = () => {
  let externalModels = ["os", "fs", "path", "events", "child_process", "crypto", "http", "buffer", "url", "better-sqlite3", "knex"];
  let result = {};
  for (let item of externalModels) {
    result[item] = () => ({
      find: new RegExp(`^${item}$`),
      code: `const ${item} = require('${item}');export { ${item} as default }`,
    });
  }
  result["electron"] = () => {
    let electronModules = ["clipboard", "ipcRenderer", "nativeImage", "shell", "webFrame"].join(",");
    return {
      find: new RegExp(`^electron$`),
      code: `const {${electronModules}} = require('electron');export {${electronModules}}`,
    };
  };
  return result;
};