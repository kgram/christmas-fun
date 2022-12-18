import Router from '@koa/router'

const partViews = [
	{ view: 'depressing_disclaimer', test: /depressing_disclaimer/ },
	{ view: 'smiley', test: /\w+_smiley/ },
	{ view: 'happy_disclaimer', test: /happy_disclaimer/ },
	{ view: 'help', test: /help/ },
	{ view: 'answer', test: /answer/ },
	{ view: 'solution', test: /solution/ },
	{ view: 'link', test: /link/ },
]

export function query() {
	const router = new Router()

	router.get('/show/me', async ctx => {
		const parts = ctx.request.query.the?.split(',') ?? []

		return ctx.render('query/page.pug', {
			views: await Promise.all(parts.map(async (part) => {
				const { view } = partViews.find(({ test }) => test.test(part)) ?? { view: 'unknown' }

				return ctx.render(`query/${view}.pug`, { part })
			}))
		})
	})

	return router.routes()
}
