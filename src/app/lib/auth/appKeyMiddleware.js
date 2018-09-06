
function appKeyMiddleware(req, res, next) {
    console.log('appKeyMiddleware', req.url);
    const APP_KEY = req.query.APP_KEY;
    if (APP_KEY === 'ABCDEF') {
        return next()
    }

    //
    res.sendStatus(403);
}

module.exports = appKeyMiddleware;