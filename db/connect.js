const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).catch(console.error);

mongoose.connection.on('error', err => {
  console.error(err);
});

mongoose.set('debug', true);
