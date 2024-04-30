const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const course = new Schema({
    name: { type: String, maxLength: 255, required: false },
    description: { type: String, maxLength: 255, default:'' },
    image: { type: String, maxLength: 255 },
    price: {type: Number, default: 0},
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
    id_category:{ type: String, maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true }
  }, {
    timestamps: true,
  });
  const Course = mongoose.model('Course', course);
module.exports = { Course };

