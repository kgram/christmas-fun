import Router from '@koa/router'

export function redirects() {
	const router = new Router()

	router.get('/this', ctx => ctx.redirect('/is'))
	router.get('/is', ctx => ctx.redirect('/not'))
	router.get('/not', ctx => ctx.redirect('/a'))
	router.get('/a', ctx => ctx.redirect('/clue'))
	router.get('/clue', ctx => {
		ctx.redirect('/at')
		ctx.set(`X-Im-like`, 'SYKE!')
		ctx.set(`X-Youre-like`, 'Whut, I would never have found that!')
		ctx.set('X-Real-Location', '/what/do/you/know')
	})
	router.get('/at', ctx => ctx.redirect('/all'))
	router.get('/all', ctx => ctx.render('redirects/too_far.pug'))

	return router.routes()
}
