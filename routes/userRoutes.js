const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.login);

router.route('/forgotpassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').post(authController.resetPassword);
router
  .route('/updatePassword')
  .post(authController.protect, authController.updatePassword);

router
  .route('/updateMe')
  .patch(
    authController.protect,
    userController.uploadImageUser,
    userController.resizeImage,
    userController.updateMe
  );

router
  .route('/deleteMe')
  .patch(authController.protect, userController.deleteMe);

router
  .route('/')
  .get(
    authController.protect,
    authController.role(['admin', 'lead-guide', 'guide']),
    userController.getAllUsers
  )
  .post(
    authController.protect,
    authController.role(['admin', 'lead-guide']),
    userController.addUser
  );
router
  .route('/:id')
  .get(
    authController.protect,
    authController.role(['admin', 'lead-guide', 'guide']),
    userController.getUserById
  )
  .patch(
    authController.protect,
    authController.role(['admin', 'lead-guide']),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.role(['admin', 'lead-guide']),
    userController.deleteUser
  );

module.exports = router;
