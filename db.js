const { MongoClient } = require('mongodb');

const state = {
  db: null,
};

exports.connect = (url, done) => {
  if (state.db) {
    return done();
  }

  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      return done(err);
    }

    state.db = client.db('express-serv-api');
    done();
  });
};

exports.get = () => state.db;
