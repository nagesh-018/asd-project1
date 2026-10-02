const cache = {};

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    if (cache[key]) {
        console.log(`Cache HIT: ${key}`);

        return res.json(cache[key]);
    }

    console.log(`Cache MISS: ${key}`);

    res.set('X-Cache', 'MISS');

    next();
}

function setCache(key, data) {
    cache[key] = data;
}

module.exports = {
    cacheMiddleware,
    setCache
};