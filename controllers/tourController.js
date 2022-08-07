const Tour = require('./../models/tourModel');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const filterImage = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('You must upload onky image format', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: filterImage,
});

const uploadTourImages = upload.fields([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 3,
  },
]);

const resizeImage = async (req, res, next) => {
  if (req.files.imageCover) {
    const ext = req.files.imageCover[0].mimetype.split('/')[1];

    req.body.imageCover = `tour-${req.user.id}-${Date.now()}.${ext}`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(1500, 1000)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${__dirname}/../public/img/tours/${req.body.imageCover}`);
  }
  if (req.files.images) {
    const ext = req.files.images[0].mimetype.split('/')[1];
    req.body.images = [];

    req.files.images.map(async (val, key) => {
      let imageName = `tour-${req.user.id}-${Date.now()}-${key + 1}.${ext}`;
      req.body.images.push(imageName);
      await sharp(val.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`${__dirname}/../public/img/tours/${imageName}`);
    });
  }
  return next();
};

const catchAsyncError = require('./../utility/catchAsync');
const {
  getAll,
  getOne,
  add,
  update,
  deleteData,
} = require('./handlerController');

const options = {
  path: 'guides',
  select: '-role -_id -passwordChangedDate',
};
const options2 = {
  path: 'reviews',
};

const getAllTours = (req, res, next) => {
  getAll(req, res, next, Tour, options, options2);
};

// Get Tour by Id
const getTourById = (req, res, next) => {
  getOne(req, res, next, Tour, options, options2);
};
// Add Tour
const addTour = (req, res, next) => {
  add(req, res, next, Tour);
};

// Update Tour
const updateTour = (req, res, next) => {
  console.log(req.files);
  update(req, res, next, Tour);
};

// Delete Tour
const deleteTour = (req, res, next) => {
  deleteData(req, res, next, Tour);
};

const tourStats = catchAsyncError(async (req, res) => {
  const data = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numberTours: { $sum: 1 },
        urtachaNarx: { $avg: '$price' },
        engArzonNarx: { $min: '$price' },
        engQimmatNarx: { $max: '$price' },
        urtachaReyting: { $avg: '$ratingsAverage' },
      },
    },
    { $sort: { urtachaNarx: -1 } },
    { $project: { _id: 0 } },
  ]);
  res.status(200).json({
    status: 'success',
    results: data.length,
    data: data,
  });
});

// Yilni tanlay (2021)
//

const tourReportYear = catchAsyncError(async (req, res) => {
  const data = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${req.params.year}-01-01`),
          $lte: new Date(`${req.params.year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        tourlarSoni: { $sum: 1 },
        tourNomi: { $push: '$name' },
      },
    },
    { $addFields: { qaysiOyligi: '$_id' } },
    { $project: { _id: 0 } },
    { $sort: { tourlarSoni: -1 } },
    { $limit: 2 },
  ]);
  res.status(200).json({
    status: 'success',
    results: data.length,
    data: data,
  });
});

module.exports = {
  getAllTours,
  addTour,
  getTourById,
  updateTour,
  deleteTour,
  tourStats,
  tourReportYear,
  uploadTourImages,
  resizeImage,
};
