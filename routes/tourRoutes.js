const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRoutes = require('./../routes/reviewRouter');

const router = express.Router();

router.use(
  '/the-best-3-tours',
  (req, res, next) => {
    req.query.sort = '-price';
    req.query.limit = 3;
    next();
  },
  tourController.getAllTours
);

router
  .route('/stats')
  .get(
    authController.protect,
    authController.role(['admin', 'lead-guide']),
    tourController.tourStats
  );
router
  .route('/report/:year')
  .get(authController.role(['admin']), tourController.tourReportYear);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.role(['admin', 'lead-guide']),
    tourController.addTour
  );

router.use('/:id/reviews', reviewRoutes);

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(
    authController.protect,
    authController.role(['admin', 'lead-guide']),
    tourController.uploadTourImages,
    tourController.resizeImage,
    tourController.updateTour
  )
  .delete(
    authController.role(['admin', 'lead-guide']),
    tourController.deleteTour
  );

module.exports = router;
