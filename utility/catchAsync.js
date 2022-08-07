const AppError = require('./appError');

const catchErrorAsync = (funksiya) => {
  const catchFunc = (req, res, next, Model, options, options2) => {
    funksiya(req, res, next, Model, options, options2).catch((err) =>
      next(new AppError(err.message, 404))
    );
  };
  return catchFunc;
};

module.exports = catchErrorAsync;
