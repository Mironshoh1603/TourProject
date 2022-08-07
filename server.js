const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

// Unhandeled Rejection
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 💥');
  console.log(err.name, err.message);
  process.exit(1);
});

// Unhandled Excpections
process.on('uncaughtException', (err) => {
  console.log('UNHANDLED Excpections 💥');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.PASSWORD
).replace('<username>', process.env.LOGIN);
console.log(DB);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
  });

app.listen(+process.env.PORT, process.env.SERVER_URL, () => {
  console.log(`Server running on port...`);
});
