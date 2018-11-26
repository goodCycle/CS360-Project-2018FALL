import mysql from 'mysql';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')

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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const tables = [
  'student',
  'master',
  'dormitory',
  'delivery',
  'mail'
];

/*
app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});
*/
// students?id=aaa
// app.post

/*

GET OPERATIONS
 : 결과는 data : results 형식의 JSON으로 반환, results는 JSON list이다.

'/api/{테이블 이름}'
 : 전체 튜플 반환. 테이블 이름은 소문자여도 됩니다.
 ex) '/api/student'

'/api/{테이블 이름}/{애트리뷰트 이름}/{애트리뷰트 값}'
 : 테이블 내 애트리뷰트 값을 통한 검색. ex) '/api/student/StuID/20150527'
 {애트리뷰트 값}에는 string일 경우 따옴표 포함시켜 주어야 합니다. ex) '/api/student/StuName/'윤형준''

'/api/student_delivery/{StuID 값}'
 : StuID 값에 해당하는 학생 방으로 온 전체 택배 출력

'/api/student_mail/{StuID 값}'
 : StuID 값에 해당하는 학생 방으로 온 전체 메일 출력

'/api/master_delivery/{MastID 값}'
 : MastID 값에 해당하는 사감 기숙사로 온 전체 택배 출력

'/api/master_mail/{MastID 값}'
 : MastID 값에 해당하는 사감 기숙사로 온 전체 메일 출력

*/

function getTable(table) {
  app.get(`/api/${table}`, (req, res) => {
    connection.query(`SELECT * FROM ${table.toUpperCase()}`, (error, results, fields) => {
      if (error) {
        res.status(500).json({ error: { message: error.message } });
      }
      console.log('The result is: ', results);
      console.log('The field is', fields);
      res.status(200).json({ data: results });
    });
  });
}

function getTableWithCond(table) {
  app.get(`/api/${table}/:aName/:aValue`, (req, res) => {
    connection.query(`SELECT * FROM ${table.toUpperCase()}
    WHERE ${req.params.aName}=${req.params.aValue}`,
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ error: { message: error.message } });
      }
      console.log('The result is: ', results);
      console.log('The field is', fields);
      console.log(req.aName);
      res.status(200).json({ data: results });
    });
  });
}

for (let i = 0; i < tables.length; i += 1) {
  getTable(tables[i]);
  getTableWithCond(tables[i]);
}

app.get('/api/student_delivery/:StuID', (req, res) => {
  connection.query(`SELECT D.* FROM STUDENT AS S, DELIVERY AS D
    WHERE S.DormID=D.DormID and S.RoomNum=D.RoomNum and S.StuID=${req.params.StuID}`,
  (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: { message: error.message } });
    }
    console.log('The result is: ', results);
    console.log('The field is', fields);
    console.log(req.aName);
    res.status(200).json({ data: results });
  });
});

app.get('/api/student_mail/:StuID', (req, res) => {
  connection.query(`SELECT M.* FROM STUDENT AS S, MAIL AS M
    WHERE S.DormID=M.DormID and S.RoomNum=M.RoomNum and S.StuID=${req.params.StuID}`,
  (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: { message: error.message } });
    }
    console.log('The result is: ', results);
    console.log('The field is', fields);
    console.log(req.aName);
    res.status(200).json({ data: results });
  });
});

app.get('/api/master_delivery/:MastID', (req, res) => {
  connection.query(`SELECT D.* FROM MASTER AS M, DELIVERY AS D
    WHERE M.DormID=D.DormID and M.MastID=${req.params.MastID}`,
  (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: { message: error.message } });
    }
    console.log('The result is: ', results);
    console.log('The field is', fields);
    console.log(req.aName);
    res.status(200).json({ data: results });
  });
});

app.get('/api/master_mail/:MastID', (req, res) => {
  connection.query(`SELECT M.* FROM MASTER AS A, MAIL AS M
    WHERE A.DormID=M.DormID and A.MastID=${req.params.MastID}`,
  (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: { message: error.message } });
    }
    console.log('The result is: ', results);
    console.log('The field is', fields);
    console.log(req.aName);
    res.status(200).json({ data: results });
  });
});

app.get('/api/login/:studentOrMaster', (req, res) => {
  const { id, password } = req.query;
  if (id == null || password == null || id === '' || password === '') {
    res.status(500).json({ error: { message: 'id and password is required!' } });
    return;
  }
  if (req.params.studentOrMaster === 'student') {
    connection.query(`SELECT * FROM STUDENT
      WHERE StuID=${id} and Password='${password}'`,
    (error, results /* , fields */) => {
      if (error) {
        res.status(500).json({ error: { message: error.message } });
        return;
      }
      res.status(200).json({ data: { user: results[0] } });
    });
    return;
  }
  if (req.params.studentOrMaster === 'master') {
    connection.query(`SELECT * FROM MASTER
      WHERE MastID=${id} and Password='${password}'`,
    (error, results /* , fields */) => {
      if (error) {
        res.status(500).json({ error: { message: error.message } });
        return;
      }
      res.status(200).json({ data: { user: results[0] } });
    });
  }
});
// app.get('/api/student/'+studentid, (req, res) => {
//   connection.query('SELECT * FROM '+table.toUpperCase(), (error, results, fields) => {
//     if (error) {
//       res.status(500).json({ error: { message: error.message } });
//     }
//     console.log('The result is: ', results);
//     console.log('The field is', fields);
//     res.status(200).json({ data: { students: results } });
//   });
// });

app.post('/api/student', (req, res) => {
  console.log(req.body)
  var student = {
    'StuID': req.body.StuID,
    'DormID': req.body.DormID,
    'RoomNum': req.body.RoomNum,
    'StuName': req.body.StuName,
    'PhoneNum': req.body.PhoneNum,
    'Password': req.body.Password
  };
  var query = connection.query('INSERT INTO STUDENT SET ?', student,
    (err, result) => {
      if (err) {
        console.error(err);
        throw err;
      }
      console.log(query);
      res.send(200, 'success');
    });
});

app.post('/api/master', (req, res) => {
  console.log(req.body)
  var student = {
    'MastID': req.body.MastID,
    'DormID': req.body.DormID,
    'StuName': req.body.StuName,
    'PhoneNum': req.body.PhoneNum,
    'Password': req.body.Password
  };
  var query = connection.query('INSERT INTO MASTER SET ?', student,
    (err, result) => {
      if (err) {
        console.error(err);
        throw err;
      }
      console.log(query);
      res.send(200, 'success');
    });
});

app.post('/api/delivery', (req, res) => {
  console.log(req.body)
  var student = {
    'DelivID': req.body.DelivID,
    'DormID': req.body.DormID,
    'RoomNum': req.body.RoomNum,
    'Receiver': req.body.Receiver,
    'Sender': req.body.Sender,
    'Content': req.body.Content,
    'Location': req.body.Location,
    'State': req.body.State,
    'ArrivalDate': req.body.ArrivalDate,
  };
  var query = connection.query('INSERT INTO DELIVERY SET ?', student,
    (err, result) => {
      if (err) {
        console.error(err);
        throw err;
      }
      console.log(query);
      res.send(200, 'success');
    });
});

app.post('/api/mail', (req, res) => {
  console.log(req.body)
  var student = {
    'MailID': req.body.MailID,
    'DormID': req.body.DormID,
    'RoomNum': req.body.RoomNum,
    'Receiver': req.body.Receiver,
    'Sender': req.body.Sender,
    'Location': req.body.Location,
    'State': req.body.State,
    'ArrivalDate': req.body.ArrivalDate,
  };
  var query = connection.query('INSERT INTO MAIL SET ?', student,
    (err, result) => {
      if (err) {
        console.error(err);
        throw err;
      }
      console.log(query);
      res.send(200, 'success');
    });
});

app.listen(port, (error) => {
  if (error) {
    console.log(error); // eslint-disable-line no-console
  }
  console.info('Express is listening on port %s.', port); // eslint-disable-line no-console
});
