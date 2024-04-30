const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const UserCourse = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  quantity: { type: Number, default: 1 },
});


module.exports = mongoose.model('UserCourse', UserCourse);

