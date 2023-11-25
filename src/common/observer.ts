export class Observer {
    /**
     * 事件中心
     */
    private dep = new Map<string, Set<(...args: any[]) => void>>()
    emit (tag: string, ...args: any[]) {
        const bucket = this.dep.get(tag)
        if (!bucket) return
        for (const cb of bucket as any) {
            cb.apply(this, args)
        }
    }

    on (tag: string, cb: (...args: any[]) => void) {
        if (!this.dep.has(tag)) this.dep.set(tag, new Set())
        const bucket = this.dep.get(tag)
        bucket?.add(cb)
    }

    once (tag: string, cb: (...args: any[]) => void) {
        if (!this.dep.has(tag)) this.dep.set(tag, new Set())
        const bucket = this.dep.get(tag)
        const newCb = (...args: any[]) => {
            cb.apply(this, args)
            this.off(tag, newCb)
        }
        bucket?.add(newCb)
    }

    off (tag: string, cb?: (...args: any[]) => void) {
        if (cb) this.dep.get(tag)?.delete(cb)
        else this.dep.delete(tag)
    }
}

/**
 * 全局发布订阅中心
 */
export const globalOberver = new Observer()