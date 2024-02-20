const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const link = process.env.DATABASE_URL; // || 'mysql://xptc6de2owk68w6f55qx:pscale_pw_qDh16eiKSkvd8Q7obP3TJzfQPPEmN023XnC5lF3yQIY@aws.connect.psdb.cloud/waf-snake?ssl={"rejectUnauthorized":false}'

const db = mysql.createConnection(link);

app.post("/addPlayer", (req, res) => {
  let { player_name, count } = req.body;
  let command = `insert into player(player_name, count)
  values
  ("${player_name}", ${count});`;
  db.query(command, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/getPlayers", (req, res) => {
  let command = "select * from player";
  db.query(command, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/clearTable", (req, res) => {
  let command = "delete from player;";
  db.query(command, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen("5000", () => {
  console.log("Server started on 5000 port");
});
