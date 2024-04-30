const Order = require('../models/Order');

class OrderController {

  getOrder(req, res) {
    Order.find()
      .then(orders => {
        res.json(orders);
      })
  }

  async createOrder(req, res) {
    try {
      const { items, userId } = req.body;


      const order = new Order({
        userId: userId,
        items: items.map(item => ({
          courseId: item.id,
          price: item.price,
          image: item.image,
        })),
        totalAmount: items.reduce((total, item) => total + item.price, 0),
      });

      order.save()
      console.log('Đơn hàng đã được lưu:', order);
      res.json(savedOrder);
      console.log('thanh cong')
    } catch (error) {
      console.error('Lỗi khi lưu đơn hàng:', error);
      res.status(500).json({ error: 'Lỗi khi lưu đơn hàng' });
    }
  };
}

module.exports = new OrderController;
