const { ObjectID } = require('mongodb');

const db = require('../db');

exports.all = (callback) => {
  db.get().collection('users').find().toArray((err, docs) => {
    callback(err, docs);
  });
};

exports.findById = (id, callback) => {
  db.get().collection('users').findOne({ _id: ObjectID(id) }, (err, doc) => {
    callback(err, doc);
  });
};

exports.create = (user, callback) => {
  db.get().collection('users').insertOne(user, (err, result) => {
    callback(err, result);
  });
};

exports.update = (id, newData, callback) => {
  db.get().collection('users').updateOne(
    { _id: ObjectID(id) },
    { $set: { newData } },
    { upsert: true },
    (err, result) => {
      callback(err, result);
    },
  );
};

exports.delete = (id, callback) => {
  db.get().collection('users').deleteOne({ _id: ObjectID(id) }, (err, result) => {
    callback(err, result);
  });
};
