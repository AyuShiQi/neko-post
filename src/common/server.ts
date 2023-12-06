/**
 * 简单的封装http模块
 */
import http from 'http'
import { ServerResponse, IncomingMessage } from 'http'

type ServerOption = {
  path: string,
  method: keyof typeof http.STATUS_CODES,
  serve: (req: IncomingMessage, res: MyServerResponse) => void
}

type Sopt = ServerOption

export interface MyServerResponse extends ServerResponse {
  json: (data: any) => void
}

// 创建的入口文件
export default function () {
  const routerMap = new Map<Sopt['path'], Map<Sopt['method'], Sopt['serve']>>()
  const currentServer = http.createServer((req, res) => {
    try {
      // 去寻找route-Map
      const handleCb = findRoute(req.url, req.method)
      // console.log('handleCb', handleCb, req.url, req.method)
      if (handleCb) {
        // console.log('find handleCb')
        handleCb(req, parseToMyServerResponse(res))
      } else {
        // 404处理函数
        notFoundResponse(res)
      }
    } catch (e) {
      console.error(e)
      serverErrorResponse(res)
    }
  })

  // 将resonse转换为新的response对象
  function parseToMyServerResponse (superRes: ServerResponse) {
    const obj: MyServerResponse = superRes as any
    obj.json = function (data: any) {
      const that: ServerResponse = this
      that.setHeader('Content-Type', 'application/json')
      that.write(JSON.stringify(data))
      that.end()
    }
    return obj
  }

  // 寻找对应的路径处理函数
  function findRoute (path: string, method: string) {
    return routerMap.get(path)?.get(method.toLowerCase())
  }

  // 处理404未找到资源情况
  function notFoundResponse (res: ServerResponse) {
    res.statusCode = 404
    res.end()
  }

  // 处理服务器端错误情况
  function serverErrorResponse (res: ServerResponse) {
    res.statusCode = 500
    res.end()
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

  const close = (cb?: () => any) => {
    currentServer.close(cb)
  } 

  return {
    addRoute,
    listen,
    close
  }
}