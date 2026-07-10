
export function logger(req, res, next) {
    console.log(`${req.method} has requested for ${req.url}`)
    next()
}

export function checkAuth(req, res, next) {
    const isLoggedIn = true;
    if (isLoggedIn) {
        next();
    } else {
        res.status(401).json({ message: "Please login" })
    }
}