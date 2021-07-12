const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: false,
}

const testSchema = mongoose.Schema({
    name: reqString,
    id: reqString,
    rep: reqString,
})

module.exports = mongoose.model('reputation', testSchema)