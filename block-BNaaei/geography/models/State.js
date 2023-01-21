var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stateSchema = new Schema ({
    name : {type: String, required: true},
    country: {type: Schema.Types.ObjectId, ref: 'Country'},
    population: Number,
    neighbouring_states : [{ types: Schema.Types.ObjectId, ref: 'State'}],
    area: Number
}, {timestamps: true});

module.exports = mongoose.model('State', stateSchema);