const mongoose = require('mongoose');

// Hàm kết nối MongoDB
const connectDB = async() => {
  try {
    // Chuỗi kết nối MongoDB
    const uri = 'mongodb://127.0.0.1:27017/f8_education_dev';

    // Không cần sử dụng useNewUrlParser và useUnifiedTopology nữa
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

// Gọi hàm kết nối để thực hiện kết nối khi ứng dụng bắt đầu chạy
// connectDB();

// Xuất đối tượng kết nối để sử dụng ở nơi khác trong ứng dụng
// module.exports = mongoose.connection;
module.exports = connectDB
