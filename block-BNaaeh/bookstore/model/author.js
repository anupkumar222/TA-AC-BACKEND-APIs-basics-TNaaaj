var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, default: "abc@xyz.com"},
  country: {type: String, default:"World"},
  bookIds: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

module.exports = mongoose.model('Author', authorSchema);
