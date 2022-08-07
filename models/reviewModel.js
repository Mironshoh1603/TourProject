const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    minlength: [2, 'You enter more words!'],
    required: [true, 'You should not empty'],
  },
  rating: {
    type: Number,
    min: [1, 'You enter at least 1 rating'],
    max: [5, 'You enter maximum 5 rating'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'tours',
    required: [true, 'Review must belong to any tour'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
    required: [true, 'Review must belong to any user'],
  },
});

reviewSchema.index({ user: 1, tour: 1 }, { unique: true });


const Review = mongoose.model('reviews', reviewSchema);

module.exports = Review;
