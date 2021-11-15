const router = require('express').Router();
const session = require('express-session');
const { sessionStore } = require('./config/db');
const accessControlMiddleware = require('./middlewares');
const File = require('./models/file');
const IDEA = require('./idea');
const crypto = require('crypto');
const RSA = require('node-rsa');
const forge = require('node-forge');

const { rsa } = forge.pki;

const sessionMiddleWare = session({
    secret: 'kek',
    saveUninitialized: true,
    resave: false,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 5, path: '/' },
});

router.use(accessControlMiddleware);

router.post('/session', sessionMiddleWare, (req, res) => {
    try {
        if (!req.session.sessionKey) {
            req.session.sessionKey = crypto.randomBytes(16);
        }
        req.session.publicKey = req.body.publicKey;
        req.session.userType = 'nobody';
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/file', async (req, res) => {
    try {
        const file = new File(req.body);
        await file.save();
        return res.sendStatus(201);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.get('/file', sessionMiddleWare, async (req, res) => {
    if (req.session.userType === 'nobody')
        return res.status(401).send({ error: 'access denied' });
    try {
        req.session.userType = 'nobody';
        const file = await File.findOne({ name: req.query.name });
        if (file) {
            const sessionKey = Buffer.from(req.session.sessionKey);
            const cipher = new IDEA(sessionKey.toString('hex'));
            const publicKey = forge.pki.publicKeyFromPem(req.session.publicKey);
            return res.status(200).send({
                cipher: Array.from(cipher.encrypt(file.text)),
                key: publicKey.encrypt(sessionKey.toString('hex')),
            });
        }
        return res.sendStatus(500);
    } catch (err) {
        req.session.userType = 'nobody';
        return res.sendStatus(500);
    }
});

router.get('/list', async (req, res) => {
    try {
        const files = await File.find().select('name');
        res.status(200).send(files);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/auth', sessionMiddleWare, (req, res) => {
    if (
        req.body.password ===
        '$2a$10$PHk7.ndcOJC3ZsxTR9s3zOFgiRFf.TVdplaow4triOSdkaQDhnn2S'
    ) {
        req.session.userType = 'admin';
        return res.status(200).send({ msg: 'ok' });
    }
    return res.status(401).send({ error: 'wrong password' });
});

router.get('/', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;
