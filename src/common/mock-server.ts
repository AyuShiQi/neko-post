import http from 'http'

export let currentServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> = null;

export function createNewServer () {
    if (currentServer) currentServer.close()
    currentServer = http.createServer((req, res) => {
        res.end('Hello Http Server')
    })
    return new Promise(res => {
        currentServer.listen(9233, () => {
            console.log('服务启动成功')
            res(9233)
        })
    })
}