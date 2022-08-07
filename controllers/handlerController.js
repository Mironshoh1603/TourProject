const catchErrorAsync = require('./../utility/catchAsync');
const AppError = require('./../utility/appError');
const FeatureApi = require('./../utility/featureApi');

const responseFunc = (res, statusCode, data) => {
  if (Array.isArray(data)) {
    res.status(statusCode).json({
      status: 'success',
      result: data.length,
      data: data,
    });
  } else {
    res.status(statusCode).json({
      status: 'success',
      data: data,
    });
  }
};

const getAll = catchErrorAsync(
  async (req, res, next, Model, options, options2, dataOption) => {
    let datas;
    let filter = new FeatureApi(req.query, Model)
      .filter()
      .sorting()
      .field()
      .pagination();

    if (options) {
      if (!options2) {
        datas = await filter.databaseQuery.populate(options);
      } else {
        datas = await filter.databaseQuery
          .populate(options)
          .populate(options2)
          // .explain();
      }
    } else {
      datas = await filter.databaseQuery;
    }
    responseFunc(res, 200, datas);
  }
);

const getOne = catchErrorAsync(
  async (req, res, next, Model, options, options2) => {
    let data;
    if (options) {
      if (!options2) {
        data = await Model.findById(req.params.id).populate(options);
      } else {
        data = await Model.findById(req.params.id)
          .populate(options)
          .populate(options2);
      }
    } else {
      data = await Model.findById(req.params.id);
    }
    responseFunc(res, 200, data);
  }
);

const add = catchErrorAsync(async (req, res, next, Model) => {
  const data = await Model.create(req.body);
  responseFunc(res, 201, data);
});

const update = catchErrorAsync(async (req, res, next, Model) => {
  const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    validator: true,
  });

  if (!data) {
    return next(new AppError('Not Found This ID', 404));
  }
  responseFunc(res, 202, data);
});

const deleteData = catchErrorAsync(async (req, res, next, Model) => {
  const data = await Model.findByIdAndDelete(req.params.id);
  responseFunc(res, 204, data);
});

module.exports = {
  getAll,
  getOne,
  add,
  update,
  deleteData,
};
