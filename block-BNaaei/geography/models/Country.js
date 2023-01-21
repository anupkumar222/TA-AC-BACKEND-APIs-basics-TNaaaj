var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema({
    name: {type: String, required: true},
    states: [{type: Schema.Types.ObjectId, ref:'State'}],
    continent: String,
    population: Number,
    ethnicity: [String],
    neighbouring_countires: [{type: Schema.Types.ObjectId, ref: 'Country'}],
    area: Number
}, { timestamps : true })

module.exports = mongoose.model('Country', countrySchema);
