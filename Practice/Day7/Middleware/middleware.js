

export function logger(req, res, next) {
    console.log(`${req.url} has used ${req.method}`)
    next()
}