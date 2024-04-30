
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');




// require('./utils/passport')
const connectDB = require('./config/db')






const coursesRouter = require('./routes/courses')
const adminRouter = require('./routes/admin')
const loginRouter = require('./routes/login')
const orderRouter = require('./routes/order')




const app = express();
connectDB()
const port = 5500;
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

app.engine('hbs', engine({
  extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'))



app.use('/courses', coursesRouter)
app.use('/users', loginRouter)
app.use('/order', orderRouter)
app.use('/admin', adminRouter)







app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
