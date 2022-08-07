const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    startLocation: {
      description: {
        type: String,
        required: [true, 'You must enter description'],
      },
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: [Number],
      address: { type: String, reuired: [true, 'You must enter address'] },
    },
    locations: [
      {
        description: {
          type: String,
          required: [true, 'You must enter description'],
        },
        type: {
          type: String,
          default: 'Point',
        },
        coordinates: [Number],
        day: {
          type: Number,
          required: [true, 'You must enter day!'],
        },
      },
    ],

    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
      },
    ],

    name: {
      type: String,
      required: [true, 'Name ni kirtishingiz shart'],
      minlength: [8, '8 tadan kam harf bulmasligi shart!'],
      maxlength: [40, '40 tadan harflar oshmasligi shart!'],
    },
    duration: {
      type: Number,
      required: true,
      min: [1, 'Durationga past raqam kiritdingiz'],
      max: [100, 'Durationga baland raqam kiritdingiz'],
    },
    maxGroupSize: {
      type: Number,
      required: true,
      validate: {
        validator: function (val) {
          if (val > 0 && Number.isInteger(val)) {
            return true;
          }
          return false;
        },
        message: 'Siz yomon raqam kiritdiz!',
      },
    },
    difficulty: {
      type: String,
      required: true,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Siz xato malumot kiritdingiz',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
    },
    secretInfo: {
      type: Boolean,
      default: false,
    },
    images: [String],
    startDates: [Date],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// tourSchema.index('price');

tourSchema.virtual('haftaDavomEtish').get(function () {
  return this.duration / 7;
});
tourSchema.virtual('reviews', {
  ref: 'reviews',
  localField: '_id',
  foreignField: 'tour',
});

tourSchema.pre('save', function (next) {
  this.name = this.name + 1;
  this.startTime = Date.now();
  next();
});

tourSchema.post('save', function (doc, next) {
  console.log(Date.now() - doc.startTime);
  next();
});

tourSchema.pre('findOneAndDelete', function (next) {
  this.findOneAndDelete({ secretInfo: { $ne: true } });
  next();
});

// tourSchema.post('find', function (doc, next) {
//   next();
// });

const Tour = mongoose.model('tours', tourSchema);

module.exports = Tour;

// Document Middleware

// Query Middleware

// Data Validation: Build In validators

// Data Validation: Custom Validators

// Handling unhandled Routes (yo'q route larni ushlab qolish)
