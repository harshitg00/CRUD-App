const mongoose = require('mongoose');
const keys = null;
// const keys = require("../config/keys");
mongoose.connect(keys.MongoURI || process.env.mongoURI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("MongoDB Connected");
    }
  }
);

require('./person.js');