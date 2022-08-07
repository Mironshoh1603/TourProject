const Review = require('./../models/reviewModel');
const appError = require('./../utility/appError');
const catchError = require('./../utility/catchAsync');

const {
  getAll,
  getOne,
  add,
  update,
  deleteData,
} = require('./handlerController');

const options = {
  path: 'tour',
  select: 'name',
};

const options2 = {
  path: 'user',
  select: 'name photo',
};

const getAllReview = (req, res, next) => {
  let modelReview;
  if (req.params.id) {
    modelReview = Review.find({ id: req.params.id });
  } else {
    modelReview = Review;
  }
  getAll(req, res, next, modelReview, options, options2);
};

const getOneReview = (req, res, next) => {
  let modelReview;
  if (req.params.id) {
    modelReview = Review.findOne({ id: req.parasm.id });
  } else {
    modelReview = Review;
  }
  getOne(req, res, next, modelReview, options, options2);
};

const addReview = (req, res, next) => {
  let modelReview;
  if (!req.params.id) {
    modelReview = Review;
  } else {
    const tourId = req.params.id;
    Review.create({
      review: req.body.review,
      rating: req.body.rating,
      tour: tourId,
      user: req.body.user,
    });
    modelReview = Review;
  }
  add(req, res, next, modelReview);
};

const updateReview = (req, res, next) => {
  update(req, res, next, Review);
};
const deleteReview = (req, res, next) => {
  deleteData(req, res, next, Review);
};
module.exports = {
  addReview,
  getAllReview,
  updateReview,
  getOneReview,
  deleteReview,
};
