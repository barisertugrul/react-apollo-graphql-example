const {model, Schema} = require('mongoose');

const articleSchema = new Schema({
    title: String,
    content: String
})

module.exports = new model('Article', articleSchema);