const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

mongoose.connection.on("connected", () => {
  console.log("MongoDB is connected");
});

mongoose.connection.on("error", err => {
  console.log(`Could not connect to MongoDB because of ${err}`);
  process.exit(-1);
});

mongoose.set("debug", true);

exports.connect = () => {
  var mongoURI =
    "mongodb+srv://ankita:ankita@cluster0-fdzjx.mongodb.net/test?retryWrites=true";

  mongoose.connect(mongoURI, {
    keepAlive: 1,
    useNewUrlParser: true
  });

  return mongoose.connection;
};
