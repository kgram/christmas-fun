import Router from '@koa/router'
import compose from 'koa-compose'

export function auth({ key: keyCorrect }) {
	const router = new Router()

	router.get('/healthcheck', (ctx) => {
		ctx.status = 200
	})

	router.get('/begin/:keyAttempt', ctx => {
		if (ctx.params.keyAttempt === keyCorrect) {
			ctx.session.authenticated = true
			ctx.session.solved = {
				colorChange: false,
				passphrase: false,
				cookie: false,
			}
			return ctx.redirect('/color/me/surprised')
		} else {
			ctx.status = 403
			return ctx.render('auth/wrong_key.pug')
		}
	})

	const enforce = (ctx, next) => {
		if (ctx.session.authenticated) return next()

		ctx.status = 401
		return ctx.render('auth/not_authenticated.pug')
	}

	return compose([
		router.routes(),
		enforce,
	])
}
