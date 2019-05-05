/**
 * Intention:
 * Helper of create and use middlewares to control auth of react router
 */

export default class Auth {
    constructor(store, history){
        this.store = store
        this.history = history
        this.replace = pathname => { location.href = `${location.origin}${pathname}`}
        this.fns = {}
        this.isStartup = false
    }

    /**
     * Get middleware with given name
     * @param {String} name Middleware name
     * @returns {Function}
     */
    fn(name) {
        return this.fns[name]
    }

    /**
     * Create react router onEnter hook with given name
     * @param {String} name Middleware name
     * @param {Function} fn onEnter Hook
     * @returns {Function}
     */
    create(name, fn) {
        this.fns[name] = (router, replace, next) => {
            return fn.apply(null, [this.store, router, this.replace, next])
        }
        return this.fns[name]
    }

    use(fn) {
        return (router, replace, next) => {
            if (this.isStartup) {
                return fn.apply(null, [this.store, router, replace, next])
            }
            let rp = (...args) => {
                this.replace.apply(null, args)
                next = () => {}
            }
            let n = () => {
                next()
            }
            return fn.apply(null, [this.store, router, rp, n])
        }
    }

    /**
     * Helper of recur execute middlewares
     * @param {Array} fns 
     * @param {Router} router 
     * @param {Function} replace 
     * @param {Function} next 
     */
    _recurExec (fns, router, replace, next) {
        if (!fns || !fns.length) {
            return next()
        }
        fns[0](router, replace, this._recurExec.bind(this, fns.slice(1), router, replace, next))
    }

    /**
     * Create react router onEnter hook function with composed middlewares
     * @param {Array} fns Middlewares
     * @returns {Function}
     */
    compose(...fns) {
        return (router, replace, next) => {
            this._recurExec(fns, router, this.replace, next)
        }
    }

    /**
     * Invoke after render root element.
     * @todo remove it dynamicly
     */
    startup() {
        this.replace = this.history.replace;
        this.isStartup = true
    }
}

/**
 * Singleton of auth
 */
Auth.instance = null

/**
 * Get instance of auth singleton
 * @param {Object} store redux store
 * @param {Object} history react history instance
 */
Auth.getInstance = function(store, history) {
    if (Auth.instance) {
        return Auth.instance
    }
    if (!store) {
        throw new Error(`create auth instance expect a store of redux`)
    }
    if (!history) {
        throw new Error(`create auth instance expect a history`)
    }
    
    Auth.instance = new Auth(store, history)
    return Auth.instance
}
