

const { Course } = require('../models/Course');
const cloudinary = require('cloudinary').v2

class CourseController {
  async getCourses(req, res) {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async postCourse(req, res) {
    try {
      const { name, description, price, } = req.body;
      const { file } = req;


      // let { sectionTitles } = req.body;

      // sectionTitles = JSON.parse(sectionTitles);
      // let sections = [];
      // for (const element of sectionTitles) {
      //   const section = new Section({
      //     title: element.section,
      //     videos: []
      //   });
      //   for (const videoData of element.videos) {
      //     const video = new Video({
      //       title: videoData.title,
      //       url: videoData.url
      //     });
      //     await video.save()

      //     section.videos.push(video);
      //   }
      //   sections.push(section);
      //   await section.save();
      // }

      const newCourse = await Course.create({
        name,
        description,
        price,
        image: req.file.filename,
        // sections: sections,
      });

      console.log('newCourse', newCourse)
      res.status(201).json(newCourse);
    } catch (error) {
      console.error('Lỗi khi tạo khóa học:', error);
      res.status(500).json({ error: 'Lỗi server' });
    }
  }





  async editCourse(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const { name, description, price } = req.body;
      const { file } = req;

      if (file) {
        console.log('co file')
        const result = await cloudinary.uploader.upload(file.path);
        var item = await Course.findById(id);

        if (item) {
          console.log(item)
          const courseUpdate = await Course.findByIdAndUpdate(id, { name, description, image: file.filename, price });
          res.json({ status: 1, message: courseUpdate });

        }
      }
    } catch (error) {
      res.status(500).json({ error: 'sửa sản phẩm thất bại' });
    }
  }


  async deleteCourse(req, res, next) {

    try {
      console.log('hh')
      let { id } = req.params;
      await Course.deleteOne({ _id: id });
      res.json({ status: true });
    } catch (error) {
      res.json({ status: false });
    }
  };

  async buyCourse(req, res) {
    const { userId, courseId } = req.params;
    // Kiểm tra và thêm thông tin vào bảng liên kết user_course
    const userCourse = new UserCourse({ user: userId, course: courseId });
    await userCourse.save();
    res.send('Mua khóa học thành công!');
  }

}



module.exports = new CourseController