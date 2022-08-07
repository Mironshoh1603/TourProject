const AppError = require('./../utility/appError');
const catchErrorAsync = require('./../utility/catchErrorLittle');
const Tour = require('./../models/tourModel');
const Review = require('./../models/reviewModel');
const getAllTour = async (req, res, next) => {
  try {
    const datas = await Tour.find();
    res.status(200).render('overview', {
      tours: datas,
    });
  } catch (error) {
    res.status(200).json({
      status: 'fail',
      message: error.message,
    });
  }
};

const getOneTour = catchErrorAsync(async (req, res, next) => {
  const data = await Tour.findById(req.params.id)
    .populate('guides')
    .populate('reviews');

  if (!data) {
    return next(new AppError('This Tour not found!', 404));
  }

  const reviews = await Review.find({ tour: req.params.id }).populate('user');
  console.log(reviews);
  res.status(200).render('tour', {
    tour: data,
    reviews: reviews,
  });
});

const meData = (req, res, next) => {
  res.status(200).render('account');
};
const login = async (req, res, next) => {
  try {
    res.status(200).render('login');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllTour, getOneTour, login, meData };
