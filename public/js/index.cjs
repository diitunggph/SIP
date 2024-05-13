const mysql2 = require('mysql2')
const express = require('express')

const bodyParse = require('body-parser')
const mssql = require('mssql')

const cors = require('cors');

const app = express();

app.use(bodyParse.json());
app.use(cors());

const server = app.listen(process.env.PORT || 5001, function () {
  const port_mssql = server.address().port;
  console.log("App now running on port ", port_mssql);
});

const dbConfig = {
  user: "sa",
  password: "13102003",
  server: `127.0.0.1`,
  database: "HRM",
  options: {
    encrypt: false,
  }
};

const connection = mysql2.createConnection({
  host: "localhost",
  database: "mydb",
  user: "root",
  password: "",
});

//MySQL

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`SERVER : http://localhost:${PORT}`);
  connection.connect((err) => {
    if (err) throw err;
    // console.log("DATABASE CONNECTED");
  })
  mssql.connect(dbConfig, (err) => {
    if (err) {
      console.log(err)
    } else {

      console.log('connect mssql successfully')
    }
  });
})

app.use("/all", (req, res) => {
  const sql_query =  `SELECT COUNT(*) AS total FROM employee`
  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

//SQL Server
app.get("/api/v1/employee", function (req, res) {
  new mssql.Request().query("select * from PERSONAL", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result);
      res.json(result.recordset);
    }
  })
});