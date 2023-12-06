import createServer from './server'
import { MockTreeNode, Method } from '@/renderer/network'

export type CreateNewServeReturn = ReturnType<typeof createServer>
let curServe: CreateNewServeReturn

export function createNewServe (routeTree: MockTreeNode) {
    if (curServe) {
        curServe.close()
        curServe = null
    }
    const serve = createServer()
    curServe = serve
    generateRoute(routeTree)
    return serve

    function generateRoute (node: MockTreeNode, prePath = '') {
        const path = `${prePath}${node.val.path}/`
        for (const next of node.children) {
            generateRoute(next, path)
        }
        // 生成route服务
        const routeOpt = node.val.option
        if (routeOpt.length > 0 && routeOpt instanceof Array) {
            for (const opt of routeOpt) {
                // console.log(path, Method[opt.method])
                serve.addRoute(path, Method[opt.method], (req, res) => {
                    // console.log('json back', opt.response, opt)
                    res.statusCode = opt.statusCode
                    res.json(opt.response)
                    res.end()
                })
            }
        } 
    }
}