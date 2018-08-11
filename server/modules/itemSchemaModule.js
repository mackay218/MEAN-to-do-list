const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListItemSchema = new Schema({
    instruction: { type: String },
    complete: { type: Boolean, default: false }
});  

module.exports = mongoose.model('ListOfItems', ListItemSchema);