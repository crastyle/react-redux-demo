const Koa = require('koa')
const sendfile = require('koa-sendfile')
const serve = require('koa-static')
const path = require('path')
const settings = require('../../share/config')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.param('verifyFileName', async (verifyFileName, ctx, next) => {
    if (verifyFileName.match(/^MP_verify_.*\.txt$/)) {
        ctx.verifyFileName = verifyFileName.split('_')[verifyFileName.split('_').length - 1].split('.')[0]
    }
    await next()
})
    .get('/:verifyFileName', async (ctx, next) => {
        if (ctx.verifyFileName) {
            ctx.response.body = ctx.verifyFileName
        } else {
            await next()
        }
    })
app.use(router.routes())

app.use(serve(path.join(__dirname, '../../dist')))

app.use(async (ctx) => {
    var stats = await sendfile(ctx, path.join(__dirname, '../../dist/index.html'))
    if (!ctx.status) ctx.throw(404)
})

app.listen(settings.port, () => {
    console.log(`listening on port ${settings.port}`)
})
