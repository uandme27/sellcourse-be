const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const User = new Schema({
    name: { type: String, maxLength: 255, required: false },
    email: { type: String, maxLength: 255, required: false },
    password: { type: String, maxLength: 255 , required: false },
    admin: { type: Boolean, default: 0 },
  });

module.exports = mongoose.model('User', User);
