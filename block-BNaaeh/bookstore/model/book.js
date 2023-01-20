var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: {type: String, required: true},
    summary: String,
    pages:Number,
    publication: String,
    cover_image_url: {type: String, default:"https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-2-CRC.png"},
    category: String,
    authorId: {type:Schema.Types.ObjectId, ref:"Author"}
})

module.exports = mongoose.model('Book', bookSchema);