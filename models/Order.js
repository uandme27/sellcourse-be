const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const Order = new Schema({
  userId: String,
  items: [
      {
          courseId: String,
          price: Number,
          image: String

      },
  ],
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', Order);

