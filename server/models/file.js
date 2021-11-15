const mongoose = require('mongoose');

const File = mongoose.model('File', {
    name: String,
    text: String,
});

module.exports = File;
