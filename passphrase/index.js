import Router from '@koa/router'

export function passphrase() {
	const router = new Router()

	router.get('/what/do/you/know', ctx => {
		return ctx.render('passphrase/page.pug')
	})
	router.post('/certainly/this', ctx => {
		console.log(`absolute truth: ${JSON.stringify(ctx.request.body)}`)
		return ctx.render('passphrase/result.pug')
	})

	return router.routes()
}
