const express = require('express');
const languageController = require('./../controllers/languageController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(languageController.getAllLanguages)
  .post(
    authController.protect,
    authController.role(['admin', 'lead-guide']),
    languageController.addLanguage
  );

router
  .route('/:id')
  .get(languageController.getLanguageById)
  .patch(
    authController.protect,
    authController.role(['admin', 'lead-guide']),
    languageController.updateLanguage
  )
  .delete(
    authController.role(['admin', 'lead-guide']),
    languageController.deleteLanguage
  );

module.exports = router;
