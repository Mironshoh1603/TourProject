const Language = require('./../models/languageModel');

const catchAsyncError = require('./../utility/catchAsync');
const {
  getAll,
  getOne,
  add,
  update,
  deleteData,
} = require('./handlerController');

const getAllLanguages = (req, res, next) => {
  getAll(req, res, next, Language);
};

// Get Language by Id
const getLanguageById = (req, res, next) => {
  getOne(req, res, next, Language);
};
// Add Language
const addLanguage = (req, res, next) => {
  add(req, res, next, Language);
};

// Update Language
const updateLanguage = (req, res, next) => {
  update(req, res, next, Language);
};

// Delete Language
const deleteLanguage = (req, res, next) => {
  deleteData(req, res, next, Language);
};

module.exports = {
  getAllLanguages,
  addLanguage,
  updateLanguage,
  deleteLanguage,
  getLanguageById,
};
