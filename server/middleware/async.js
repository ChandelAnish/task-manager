const asyncwrapper = (fun) => {
    return async (req, res, next) => {
        try {
            await fun(req, res, next);
        } catch (error) {
            next(error);//this error is default error handlers .Express comes with a built-in error handler that takes care of any errors that might be encountered in the app. This default error-handling middleware function is added at the end of the middleware function stack.

            //If you pass an error to next() and you do not handle it in a custom error handler, it will be handled by the built-in error handler; the error will be written to the client with the stack trace. The stack trace is not included in the production environment.

            //Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three: (err, req, res, next). For example:
            // app.use((err, req, res, next) => {
            //     console.error(err.stack)
            //     res.status(500).send('Something broke!')
            //   })
            //after writing this next(error)--> will refer to my custom error handler middleware not the default one.
        }
    }
}

module.exports = asyncwrapper;