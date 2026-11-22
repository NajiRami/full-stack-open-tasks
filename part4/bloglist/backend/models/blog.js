const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

module.exports = mongoose.model('Blog', BlogSchema)