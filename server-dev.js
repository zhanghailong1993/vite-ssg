const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const koaConnect = require('koa-connect')
const { createServer: createViteServer } = require('vite');

(async () => {
  const app = new Koa()

  // 创建 vite 服务
  const viteServer = await createViteServer({
    root: process.cwd(),
    logLevel: 'error',
    server: {
      middlewareMode: 'true'
    }
  })

  // 注册 vite 的 Connect 实例作为中间件（注意：vite.middlewares 是一个 Connect 实例）
  app.use(koaConnect(viteServer.middlewares))

  app.use(async (ctx) => {
    const url = ctx.path
    try {
      // 1. 获取index.html
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')

      template = await viteServer.transformIndexHtml(url, template)
      
      const { render } = await viteServer.ssrLoadModule('/src/entry-server.ts')

      //  4. 渲染应用的 HTML
      const [renderedHtml, state] = await render(ctx, {})

      // 5. 注入渲染后的应用程序 HTML 到模板中。
      const html = template.replace(`<!--ssr-outlet-->`, renderedHtml).replace('<!--pinia-state-->', state);

      ctx.type = `text/html`
      ctx.body = html
    } catch (e) {
      // 你的实际源码中。
      viteServer.ssrFixStacktrace(e)
      console.error(e)
      ctx.throw(500, e.stack)
    }
   
  })

  app.listen(9000, () => {
    console.log('server is listening in 9000');
  })
})()