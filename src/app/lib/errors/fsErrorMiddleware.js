module.exports = function fsErrorMiddleware(error, req, res, next) {
    console.log('fsErrorMiddleware called')
    // LOG
    if (error.toString().indexOf('fs') >= 0) {
        return res.status(500)
           .json({
               status: 500,
               error: 'File System error'
           })
        //return; 
    }

    //else, if error is not related to fs
    console.log('fsErrorMiddleware forward next')
    return next(error); // forward to next error middleware 
}