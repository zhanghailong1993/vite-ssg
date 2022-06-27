const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const sendFile = require('koa-send')

const resolve = p => path.resolve(__dirname, p)

const clientRoot = resolve('dist/client')
const template = fs.readFileSync(resolve('dist/client/index.html'), 'utf8')
const render = require('./dist/server/entry-server.js').render
const manifest = require('./dist/client/ssr-manifest.json');

(async () => {
  const app = new Koa()

  app.use(async (ctx) => {

    // 请求的是静态资源
    if (ctx.path.startsWith('/assets')) {
      await sendFile(ctx, ctx.path, { root: clientRoot })
      return
    }

    const [appHtml, state, preloadLinks] = await render(ctx, manifest)

    const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace('<!--preload-links-->', preloadLinks).replace('<!--pinia-state-->', state)
    
    ctx.type = `text/html`
    ctx.body = html 
  })

  app.listen(8080, () => console.log('started server on http://localhost:8080'));
})()