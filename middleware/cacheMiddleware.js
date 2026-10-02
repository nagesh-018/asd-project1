const cache = {};

const TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    const cachedData = cache[key];

    if (!cachedData) {
        console.log(`Cache MISS: ${key}`);

        res.set('X-Cache', 'MISS');

        return next();
    }

    const age = Date.now() - cachedData.createdAt;

    if (age > TTL) {
        console.log(`Cache EXPIRED: ${key}`);

        delete cache[key];

        res.set('X-Cache', 'MISS');

        return next();
    }

    console.log(`Cache HIT: ${key}`);

    res.set('X-Cache', 'HIT');

    return res.json(cachedData.data);
}

function setCache(key, data) {
    cache[key] = {
        data: data,
        createdAt: Date.now()
    };
}

function clearCache() {
    for (const key in cache) {
        delete cache[key];
    }

    console.log('Cache cleared');
}

module.exports = {
    cacheMiddleware,
    setCache,
    clearCache
};