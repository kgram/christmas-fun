import Router from '@koa/router'
import compose from 'koa-compose'

export const device = () => (ctx, next) => {
	if (ctx.userAgent.isMobile) {
		ctx.status = 406
		return ctx.render('device/warning.pug')
	}

	return next()
}
