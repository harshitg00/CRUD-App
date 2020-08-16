const mongoose = require('mongoose');
const keys = require("../config/keys");
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("MongoDB Connected");
    }
  }
);

require('./person.js');