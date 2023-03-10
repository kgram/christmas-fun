import Koa from 'koa'
import views from 'koa-views'
import serve from 'koa-static'
import mount from 'koa-mount'
import { koaBody } from 'koa-body'
import session from 'koa-session'
import { userAgent } from 'koa-useragent'

import { resolve } from './resolve.js'

import { color_change } from './color_change/index.js'
import { redirects } from './redirects/index.js'
import { passphrase } from './passphrase/index.js'
import { query } from './query/index.js'
import { auth } from './auth/index.js'
import { cookie } from './cookie/index.js'
import { notFound } from './notFound/index.js'
import { prize } from './prize/index.js'
import { device } from './device/index.js'

console.log('Starting app...')

const port = process.env.PORT ?? 8080

const app = new Koa()

app.use(async (ctx, next) => {
	const start = Date.now();
	let logEnabled = true
	ctx.noLog = () => { logEnabled = false }
	await next();
	if (logEnabled) {
		const { isMobile, browser, version } = ctx.userAgent
		console.info(`${ctx.method} ${ctx.href} ${Date.now() - start}ms ${ctx.status} "${browser}${isMobile ? '[m]' : ''} ${version}"`);
	}
});

app.keys = [process.env.SESSION_KEY]
app.use(session(app))

app.use(koaBody())
app.use(userAgent)

app.use(views(resolve('.'), {
	map: {
		pug: 'pug',
	},
}))

app.use(mount('/assets', serve(resolve('./assets'))))

app.use(device())
app.use(auth({ key: process.env.LOGIN_KEY }))

app.use(color_change())
app.use(redirects())
app.use(passphrase())
app.use(query())
app.use(cookie())
app.use(prize({ key: process.env.PRIZE_KEY }))

app.use(notFound())

app.listen(port, () => {
	console.log(`Listening on :${port}`)
})
