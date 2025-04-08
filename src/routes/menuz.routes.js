import express from 'express';
import uploader from '../config/multer.config.js';
import {
  get,
  getById,
  removeById,
  updateCategory,
  upload,
  procezz,
} from '../controllers/menuz.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/', get);
router.get('/:id', getById);
router.delete('/delete/:id', removeById);
router.post('/update/category/:id/:category', updateCategory);
router.post('/upload', uploader.array('files'), upload);
router.post('/process/:id', procezz);

export default router;
