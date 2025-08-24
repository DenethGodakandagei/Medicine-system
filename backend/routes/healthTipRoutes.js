import express from 'express';
import multer from 'multer';
import {
  createHealthTip,
  getAllHealthTips,
  getSingleHealthTip,
  updateHealthTip,
  deleteHealthTip,
} from '../controllers/healthTipsController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/', upload.single('image'), createHealthTip);
router.get('/', getAllHealthTips);
router.get('/:id', getSingleHealthTip);
router.put('/:id', upload.single('image'), updateHealthTip);
router.delete('/:id', deleteHealthTip);

export default router;