"use strict";
const moment = require('moment'); 
const express = require('express');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
var jsonParser = bodyParser.json();
app.use(cors());

// SECRET KEY
const key = "ASECRET";
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
app.post("/registro",verifyToken, jsonParser, async (req, res) => {
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let email = req.body.email;
    let password = req.body.password;
    let passwordHash = await bcryptjs.hash(password, 9)
   
    let admin = req.body.admin;
    let sql1 = `select * FROM usuario WHERE email ='${email}'`;
    connection.query(sql1, (error, results, fields) => {
        if (error)
            throw error;
        else {
            if (results == "") {
                let sql2 = `insert into Usuario values ( '${nombre}','${apellido}','${email}','${passwordHash}', '${admin}')`;
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
// app.get("/obtenerUsuario", jsonParser, (req, res) => {
//     let sql = "select * from usuario"
//     connection.query(sql , function (error, results, fields) {
//         if (error) {
//             console.error(error);
//         } else {
//             res.send(JSON.stringify(results))
//         }
//     })
// })

//Inicia sesion de un usuario devolviendo un token de inicio de sesion
app.post("/iniciosesion", jsonParser, (req, res) => {
    let email = req.body.email;
    let sql1=`select * from usuario where email='${email}'`
    connection.query(sql1, function (error, results, fields) {
        if (error)
            throw error;
        if (results == "")
            res.status(404).json({ "message": "No existe este usuario" });
        else {
            
            let hashSaved=results[0].password;
            let password = req.body.password;
        
            let compare = bcryptjs.compareSync(password, hashSaved);
            if (compare) {
                let sql2=`select * from usuario where email='${email}' and password='${hashSaved}'`
                connection.query(sql2, function (error, results, fields) {
                    if (error)
                        throw error;
                    if (results != "") {
                        
                        const token = jwt.sign({ id: results[0].admin }, 'secretkey');
                        return res.status(200).json({"token": token});
                    }
                });
            }
            else {
                res.status(401).json({ "message": "Contraseña equivocada" });
            }
        }
    });
});
app.get("/consultas",verifyToken ,jsonParser,(req, res) =>{
    let sql = 'select * from consulta';
    connection.query(sql, (error, results, fields) =>{
        if(error) throw error;
        else{
            res.json(results);
        }
    })
})
app.post("/consultaPorId",verifyToken ,jsonParser,(req, res) =>{
    let idConsulta =req.body.idConsulta;
    let sql = `select * from consulta where idConsulta='${idConsulta}'`;
    connection.query(sql, (error, results, fields) =>{
        if(error) throw error;
        else{
            res.status(200).json(results);
        }
    })
})
app.post("/agregarconsulta",verifyToken, jsonParser, (req, res) => {
    let tipoConsulta = req.body.tipoConsulta;
    let nombreAnimal = req.body.nombreAnimal;
    
    let aux = moment(req.body.fecha).format("YYYY-MM-DD");
    let fecha = aux.concat(" "+req.body.hora.toString()+":00");     

    let emailVet =  req.body.emailVet;
    let nombreCliente = req.body.nombreCliente;
    let rutCliente = req.body.rutCliente;
    let descripcion = req.body.descripcion;
    let telefonoCliente = req.body.telefonoCliente;
    let sql1 = `select * FROM consulta`;
    connection.query(sql1, (error, results, fields) => {
        if (error)
            throw error;
        else { 
            let sql2 = `insert into consulta values ('null','${fecha}','${nombreAnimal}','${nombreCliente}','${rutCliente}','${telefonoCliente}','${emailVet}','${tipoConsulta}','${descripcion}')`;
            connection.query(sql2, function (error, results, fields) {
                if (error)
                    throw error;
                else {
                    res.json({ "id": 1 });
                }
            });
        }
    });
});
app.put('/actualizarconsulta',verifyToken, jsonParser,(req,res)=>{
    let idConsulta =req.body.idConsulta;
    let tipoConsulta = req.body.formvalue.tipoConsulta;
    let nombreAnimal = req.body.formvalue.nombreAnimal;

    let aux = moment(req.body.formvalue.fecha).format("YYYY-MM-DD");
    console.log(req.body.formvalue.hora)
    let fecha = aux.concat(" "+req.body.formvalue.hora+":00");     

    let emailVet =  req.body.formvalue.emailVet;
    let nombreCliente = req.body.formvalue.nombreCliente;
    let rutCliente = req.body.formvalue.rutCliente;
    let descripcion = req.body.formvalue.descripcion;
    let telefonoCliente = req.body.formvalue.telefonoCliente;
    let sql = `update Consulta set fecha='${fecha}', nombreAnimal='${nombreAnimal}', nombreCliente='${nombreCliente}' ,
    rutCliente='${rutCliente}' ,telefonoCliente='${telefonoCliente}' ,emailVet='${emailVet}', 
    tipoConsulta='${tipoConsulta}',  descripcion='${descripcion}'where idConsulta='${idConsulta}'`;
    connection.query(sql, (error, results, fields) =>{
        if(error) throw error;
        else{
            if(results.affectedRows==0) res.json({id: 2});
            else res.json({id: 1});
        }
    });
});
app.delete('/eliminarconsulta',verifyToken,jsonParser ,(req, res) =>{
    const idConsulta = req.body.idConsulta;
    let sql = `delete from Consulta where idConsulta='${idConsulta}'`;
    connection.query(sql, (error, results, fields) =>{
        if(error) throw error;
        else{
            res.json({id:1})
        }
    })
});

function verifyToken(req,res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unathorized Request');
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token == 'null'){
        return res.status(401).send('Unathorized Request');
    }
    const data = jwt.verify(token,'secretkey');
    req.idTipo=data._id;
    next();
}