const express = require('express');

const db = require('./db');
const usersController = require('./controllers/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3012;

app.get('/', (req, res) => {
  res.send('Hello API');
});

app.get('/users', usersController.all);
// (req, res) => {
//   db.get().collection('users').find().toArray((err, docs) => {
//     if (err) {
//       console.log(err);
//       return res.sendStatus(500);
//     }
//     res.send(docs);
//   });
// });

app.get('/users/:id', usersController.findById);

app.post('/users', usersController.create);

app.put('/users/:id', usersController.update);

app.delete('/users/:id', usersController.delete);

db.connect('mongodb://localhost:27017/', (dbErr) => {
  if (dbErr) {
    return console.log(`Error ATTENTION ${dbErr}`);
  }

  app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }
    return console.log(`API app started - server is listening on port ${port}`);
  });
});
