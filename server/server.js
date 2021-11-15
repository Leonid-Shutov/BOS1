const express = require('express');
const { db } = require('./config/db');
const router = require('./routes');

const initApp = async () => {
    await db.connect();

    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(router);

    app.listen(3000, '0.0.0.0', function() {
        console.log('Listening to port:  ' + 3000);
    });
};
initApp();
