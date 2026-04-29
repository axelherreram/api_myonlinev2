const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { uploadProfilePhoto } = require('../middlewares/uploadMiddleware');

// Define routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/recover-password', authController.requestPasswordRecovery);

// Protected routes (require valid JWT)
router.put('/update-password', authMiddleware, authController.updatePassword);
router.post('/update-photo', authMiddleware, uploadProfilePhoto.single('photo'), authController.updateProfilePhoto);

module.exports = router;
