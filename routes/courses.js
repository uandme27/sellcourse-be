const express = require('express')
// const upload = require('../utils/multer')
const upload = require('../utils/cloudinary')

const router = express.Router()

const courseControllers = require('../controllers/courseController')
router.get('/', courseControllers.getCourses)
router.post('/post', upload.single('image'), courseControllers.postCourse);
router.put('/edit/:id', upload.single('image'), courseControllers.editCourse)
router.delete('/:id', courseControllers.deleteCourse);
router.post('/buy/:userId/:courseId', courseControllers.buyCourse);

module.exports = router