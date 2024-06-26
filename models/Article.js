const mongoose = require("mongoose")
const schema = mongoose.Schema

const articleSchema = new schema({
    title: String,
    body: String,
    date: Date,
    numberOfLikes: Number,
})

const Article = mongoose.model("Article" , articleSchema)


module.exports = Article