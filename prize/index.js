import Router from '@koa/router'

export function prize({ key }) {
	const router = new Router()

	router.get('/get/some', (ctx) => {
		return ctx.render('prize/page.pug', { key })
	})

	return router.routes()
}
