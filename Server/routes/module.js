const express = require('express');
const router = express.Router();
const multer  = require('multer');

const CourseModule = require('../modules/Module');
const Course = require('../modules/Course');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, `./assets`);
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 100000000
  },
  fileFilter(req, file, cb) {
    cb(undefined, true);
  }
});

router.post(
  '/',
  upload.single('file'),
  async (req, res) => {
    try {
      const { title, orgId, type, description, location, moduleIds, datetime, courseId, currentModuleIndex } = req.body;
      const { path, mimetype } = req?.file || {};
      const module = new CourseModule({
        title, type, orgId, description, location, courseId,
        file_path: path??'',
        file_mimetype: mimetype??'',
        datetime
      });
      const newModule = await module.save();
      if(newModule.id) {
        let course = await Course.findById(courseId);
        const modulesToAdd = moduleIds ? [...moduleIds?.slice(0, currentModuleIndex), newModule.id,...moduleIds.slice(currentModuleIndex)] : [newModule.id]
        await Course.findOneAndUpdate({ _id: courseId }, {...course._doc,  modules: modulesToAdd });
        course = await Course.findById(courseId);
        return res.status(200).send({message: 'Module created successfully!!!', module: newModule, course });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({message: 'Server Error'});
    }
  }
);

router.put(
  '/:id',
  upload.single('file'),
  async (req, res) => {
    const { id } = req.params;
    try {
      const { title, orgId, type, description, location, datetime, moduleIds, courseId } = req.body;
      const { path, mimetype } = req?.file || {};
      const module = {
        title, type, orgId, description, location,datetime
      };
      const matchedModule = await CourseModule.findById(id);
      if(req?.file) {
        module.file_path = path ?? matchedModule.file_path;
        module.file_mimetype = mimetype ?? matchedModule.file_path;
      }
      let course = await Course.findById(courseId);
      await Course.findOneAndUpdate({ _id: courseId }, {...course._doc,  modules: moduleIds });
      await CourseModule.updateOne({ _id: id }, { ...matchedModule._doc, ...module });
      const newModule = await CourseModule.findById(id);
      return res.status(200).send({message: 'Module updated successfully!!!', module: newModule });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({message: 'Server Error'});
    }
  }
);

router.post(
  '/modulesById',
  async (req, res) => {
    try {
      const modules = await CourseModule.find({ _id: req.body });
      return res.status(200).send(modules);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({message:'Server Error'});
    }
  }
);

module.exports = router;
