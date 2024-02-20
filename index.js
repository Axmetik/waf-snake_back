const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const link =
  'mysql://6fwc6g7ju41re6tsmf2s:pscale_pw_MAqBOCIueE1wb8R7kXVd5hOCzXVasAR2AL7fgqeSo3R@aws.connect.psdb.cloud/waf-snake?ssl={"rejectUnauthorized":true}';

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
  console.log("Server statred on 5000 port");
});
