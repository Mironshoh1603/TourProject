const mongoose = require('mongoose');
const fs = require('fs');
const tourModel = require('./../../models/tourModel');
const userModel = require('./../../models/userModel');
const reviewModel = require('./../../models/reviewModel');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
console.log(process.env.DATABASE);

// const DB = process.env.DATABASE.replace(
//   '<username>',
//   process.env.LOGIN
// ).replace('<password>', process.env.PASSWORD);

mongoose
  .connect(
    'mongodb+srv://mironshoh1603:996887953@cluster0.53h1qbc.mongodb.net/?retryWrites=true&w=majority',
    {}
  )
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
  });

const tour = JSON.parse(fs.readFileSync('./dev-data/data/tours.json', 'utf-8'));
const user = JSON.parse(fs.readFileSync('./dev-data/data/users.json', 'utf-8'));
const review = JSON.parse(
  fs.readFileSync('./dev-data/data/reviews.json', 'utf-8')
);

const addData = async () => {
  try {
    await tourModel.create(tour);
    await userModel.create(user);
    await reviewModel.create(review);
    console.log('Narmalni saqladi');
  } catch (err) {
    console.log('Kalla quydi: ' + err);
  }
};
const deleteData = async () => {
  try {
    await tourModel.deleteMany();
    await userModel.deleteMany();
    await reviewModel.deleteMany();
    console.log('Top toza');
  } catch (err) {
    console.log('Kir');
  }
};
// deleteData();
// addData();
