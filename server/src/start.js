import Koa from 'koa'
import serve from 'koa-static'
import Router from 'koa-router'
import path from 'path'
import httpProxy from 'http-proxy'
import settings from '../../share/config'
import createSSR from './middlewares/ssr'

export default function(parameters) {
  const app = new Koa()

  app.use(serve(path.resolve(__dirname, '../../'), {index: false}))

  const router = Router()

  const proxy = httpProxy.createProxyServer({ target: 'http://localhost:xxxx' })
	router.use('/api', (req, res) => proxy.web(req, res))

  app
  .use(router.routes())
  .use(router.allowedMethods());

  app.use(createSSR(parameters.chunks()))

  app.listen(settings.port, () => {
    console.log(`listening on port ${settings.port}`)
  })
}
