const router = require('express').Router();
const viewController = require('./../controllers/viewController');
const authController = require('../controllers/authController');

router.route('/').get(authController.isSignIn, viewController.getAllTour);
router
  .route('/overview')
  .get(authController.isSignIn, viewController.getAllTour);
router
  .route('/tour/:id')
  .get(authController.isSignIn, viewController.getOneTour);
router.route('/login').get(authController.isSignIn, viewController.login);
router.route('/logout').post(authController.isSignIn, authController.logout);
router.route('/me').get(authController.protect, viewController.meData);
module.exports = router;
