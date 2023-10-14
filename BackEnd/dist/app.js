"use strict";
const express = require('express');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const CryptoJS = require("crypto-js");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
var jsonParser = bodyParser.json();
app.use(cors());
// SECRET KEY
var key = "ASECRET";
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'PetAppoint'
});
connection.connect(function (err) {
    if (err) {
        console.error('Error conectando a la DB ' + err.stack);
        return;
    }
    console.log('Conexión establecida' + connection.threadId);
});
const configuracion = {
    hostname: "127.0.0.1",
    port: 5000,
};
app.listen(configuracion, () => {
    console.log(`Conectando al servidor http://localhost:${configuracion.port}`);
});
//Registra 
app.post("/registro", jsonParser, (req, res) => {
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let email = req.body.email;
    let password = CryptoJS.AES.encrypt(req.body.password, key).toString();
    //console.log("datos: " +req.body.password, password);
    let idTipo = 0;
    let sql1 = `select * FROM usuario WHERE email ='${email}'`;
    connection.query(sql1, (error, results, fields) => {
        if (error)
            throw error;
        else {
            if (results == "") {
                let sql2 = `insert into Usuario values ( '${nombre}','${apellido}','${email}','${password}', ${idTipo})`;
                connection.query(sql2, function (error, results, fields) {
                    if (error)
                        throw error;
                    else {
                        res.json({ "id": 1 });
                    }
                });
            }
            else
                res.json({ "id": 2 });
        }
    });
});
//Inicia sesion de un usuario devolviendo un token de inicio de sesion
app.post("/iniciosesion", jsonParser, (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let contraEncriptada;
    connection.query("select * from usuario where email=?", [email], function (error, results, fields) {
        if (error)
            throw error;
        if (results == "")
            res.json({ "id": 1 });
        else {
            contraEncriptada = results[0].password;
            //console.log(password,contraEncriptada);
            let decrypted = CryptoJS.AES.decrypt(contraEncriptada, key);
            let contraDesencriptada = decrypted.toString(CryptoJS.enc.Utf8);
            //console.log(password,contraDesencriptada);
            if (contraDesencriptada != password) {
                connection.query("select * from usuario where password=?", [password], function (error, results, fields) {
                    if (error)
                        throw error;
                    if (results == "")
                        res.json({ "id": 2 });
                });
            }
            else {
                connection.query("select * from usuario where  email=? and password=?", [email, contraEncriptada], function (error, results, fields) {
                    if (error)
                        throw error;
                    if (results != "") {
                        const token = jwt.sign({ id: results[0].idTipo }, 'secretkey');
                        return res.status(200).json({ "id": 3, "token": token, "resultados": results });
                    }
                });
            }
        }
    });
});
