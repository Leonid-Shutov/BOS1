const accessControlMiddleware = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Accept, Authorization',
    );
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
};

module.exports = accessControlMiddleware;
