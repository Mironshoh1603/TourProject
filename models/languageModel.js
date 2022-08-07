const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  source_word: {
    type: String,
    required: [true, 'You must enter sourse word!'],
    validate: {
      validator: function (val) {
        return val.startsWith('source_');
      },
      message: "you must enter your source word startwith 'source'",
    },
  },
  uz: {
    type: String,
    required: [true, 'You must enter uzword'],
  },
  ru: {
    type: String,
    required: [true, 'You must enter ruword'],
  },
  en: {
    type: String,
    required: [true, 'You must enter engword'],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Language = mongoose.model('languages', languageSchema);
module.exports = Language;
