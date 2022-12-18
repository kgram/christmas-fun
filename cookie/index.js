import Router from '@koa/router'

export function cookie() {
	const router = new Router()

	router.get('/what/do/you/want', (ctx) => {
		let value = ctx.cookies.get('you_are')
		if (!value) {
			value = 'the wrong person'
			ctx.cookies.set('you_are', value)
		}

		if (/wrong.+person/.test(value)) {
			return ctx.render('cookie/wrong_person.pug')
		} else if (/right.+person/.test(value)) {
			return ctx.render('cookie/right_person.pug')
		} else {
			return ctx.render('cookie/greet.pug', { value })
		}
	})

	return router.routes()
}
