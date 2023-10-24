const mongoose = require('mongoose');

module.exports = (e) => {
  if (e instanceof mongoose.Error.ValidationError) {
    let err = { errors: {} };
    for (let key in e.errors) {
      err.errors[key] = e.errors[key].message;
    };
    return [422, err];
  } else if (e instanceof mongoose.mongo.MongoError) {
    if (e.code === 11000) {
      return [422, { errors: { email: 'This email is already taken!' } }];
    };
    console.error('Error connecting to MongoDB:', e.message);
    return [500, { errors: { message: e.message } }];
  } else {
    console.error('Unknown error:', e.message);
    return [500, { errors: { message: e.message } }];
  };
};