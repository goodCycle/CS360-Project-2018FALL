import mysql from 'mysql';

const path = require('path');
const express = require('express');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'cupid',
  password: '1234',
  database: 'taekbae'
});
connection.connect();

const port = process.env.PORT ? process.env.PORT : 8181;
const dist = path.join(__dirname, 'dist');

app.use(express.static(dist));

/*
app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});
*/
// students?id=aaa
// app.post
app.get('/api/students', (req, res) => {
  connection.query('SELECT * FROM STUDENTS', (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: { message: error.message } });
    }
    console.log('The result is: ', results);
    console.log('The field is', fields);
    res.status(200).json({ data: { students: results } });
  });
});

app.listen(port, (error) => {
  if (error) {
    console.log(error); // eslint-disable-line no-console
  }
  console.info('Express is listening on port %s.', port); // eslint-disable-line no-console
});
