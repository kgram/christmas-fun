import Router from '@koa/router'

export function color_change() {
	const router = new Router()

	router.get('/color/me/surprised', ctx => {
		return ctx.render('color_change/color_me.pug', { isSolved: ctx.session.solved.colorChange })
	})
	router.post('/color/me/solved', (ctx) => {
		ctx.session.solved.colorChange = true
	})

	return router.routes()
}
