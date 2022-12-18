export const notFound = () => (ctx) => {
	ctx.status = 404
	return ctx.render('notFound/page.pug')
}
