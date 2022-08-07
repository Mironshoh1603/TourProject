const reviewController = require('./../controllers/reviewController');
const express = require('express');
const authController = require('./../controllers/authController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    authController.protect,
    authController.role(['user']),
    reviewController.addReview
  );

router
  .route('/:id')
  .get(reviewController.getOneReview)
  .patch(
    authController.protect,
    authController.role(['user']),
    reviewController.updateReview
  )
  .delete(
    authController.protect,
    authController.role(['user', 'admin']),
    reviewController.deleteReview
  );
module.exports = router;
