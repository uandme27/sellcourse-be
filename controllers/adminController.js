
const jwt = require('jsonwebtoken')

class AdminController {
    index(req, res, next) {
        res.render('admin/index');
    }

    product(req, res, next) {
        res.render('admin/product');

    }

    addProduct(req, res, next) {
        res.render('admin/addProduct');

    }
    editProduct(req, res, next) {
        const courseId = req.params.id
        res.render('admin/editProduct', { courseId });

    }

    checkAuthentication(req, res, next) {
        try {
            const token = req.cookies.token
            const ketqua = jwt.verify(token, 'mk')
            console.log(ketqua)
            if (ketqua) {
                next()
            }
        } catch (error) {
            console.log(error)
            res.json('lỗi')
        }
    }



}

module.exports = new AdminController