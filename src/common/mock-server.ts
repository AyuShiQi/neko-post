import http from 'http'
import { ServerResponse, IncomingMessage } from 'http'

const STATUS_CODES = http.STATUS_CODES

type ServerOption = {
  path: string,
  method: keyof typeof http.STATUS_CODES,
  serve: (req: IncomingMessage, res: MyServerResponse) => void
}

type Sopt = ServerOption

interface MyServerResponse extends ServerResponse {
  json: (data: any) => void
}

function parseToMyServerResponse (superRes: ServerResponse) {
  const obj: MyServerResponse = Object.create(superRes)
  obj.json = function (data: any) {
    this.setHead('Content-Type', "application/json")
    this.write(JSON.stringify(data))
    this.end()
  }
  return obj
}

// 创建的入口文件
export default function () {
  const routerMap = new Map<Sopt['path'], Map<Sopt['method'], Sopt['serve']>>()
  const currentServer = http.createServer((req, res) => {
    // 去寻找route-Map
    const handleCb = findRoute(req.url, req.method)
    if (handleCb) {
      handleCb(req, parseToMyServerResponse(res))
    } else {
      // 404处理函数
      notFoundResponse(res)
    }
    res.end()
  })

  // 寻找对应的路径处理函数
  function findRoute (path: string, method: string) {
    return routerMap.get(path)?.get(method)
  }

  function notFoundResponse (res: ServerResponse) {
    res.writeHead(404, STATUS_CODES[404])
  }

  // 增添router
  const addRoute = (path: Sopt['path'], method: Sopt['method'], serve: Sopt['serve']) => {
    if (!routerMap.has(path)) routerMap.set(path, new Map())
    const route = routerMap.get(path)
    route.set(method, serve)
  }

  const listen = (port: number, cb: () => any) => {
    currentServer.listen(port, cb)
  }

  return {
    addRoute,
    listen
  }
}