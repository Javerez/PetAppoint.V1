const { Router } = require('express');
const router = Router();
require('dotenv').config()
const moment = require('moment'); 
const mysql = require("mysql2");
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
var jsonParser = bodyParser.json();


const connection = mysql.createConnection({
    host:process.env.DB_HOST ,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    port:process.env.DB_PORT,
    database:process.env.MYSQL_DB

});

connection.connect(function (err) {
    if (err) {
        console.error('Error conectando a la DB ' + err.stack);
        return;
    }
    console.log('Conexión establecida ' + connection.threadId);
});

//Registra 
router.post("/registro",verifyToken, jsonParser, async (req, res) => {
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let email = req.body.email;
    let password = req.body.password;
    let passwordHash = await bcryptjs.hash(password, 9)
    let admin
    let aux = req.body.admin;
    if(aux==true) admin='D8a1;or4nIF@'
    else admin='Ve93*8#,hf)4'
    let sql1 = `select * FROM usuario WHERE email ='${email}'`;
    connection.query(sql1, (error, results, fields) => {
        if (error)
            throw error;
        else {
            if (results == "") {
                let sql2 = `insert into usuario values ( '${nombre}','${apellido}','${email}','${passwordHash}', '${admin}')`;
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
router.post("/iniciosesion", jsonParser, (req, res) => {
    let email = req.body.email;
    let sql1=`select * from usuario where email='${email}'`
    connection.query(sql1, function (error, results, fields) {
        if (error)
            throw error;
        if (results == "")
            res.json({ "id": 3 ,"message": "No existe este usuario" });
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
                        return res.status(200).json({"id": 1,"token": token});
                    }
                });
            }
            else {
                res.json({ "id": 2 , "message": "Contraseña equivocada" });
            }
        }
    });
});
router.get("/consultas",verifyToken ,jsonParser,(req, res) =>{
    let sql = 'select * from consulta';
    connection.query(sql, (error, results, fields) =>{
        if(error) throw error;
        else{
            res.json(results);
        }
    })
})
router.post("/consultaPorId",verifyToken ,jsonParser,(req, res) =>{
    let idConsulta =req.body.idConsulta;
    let sql = `select * from consulta where idConsulta='${idConsulta}'`;
    connection.query(sql, (error, results, fields) =>{
        if(error) throw error;
        else{
            res.status(200).json(results);
        }
    })
})
router.post("/agregarconsulta",verifyToken, jsonParser, (req, res) => {
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
            let sql2 = `insert into consulta values ('${null}','${fecha}','${nombreAnimal}','${nombreCliente}','${rutCliente}','${telefonoCliente}','${emailVet}','${tipoConsulta}','${descripcion}')`;
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
router.put('/actualizarconsulta',verifyToken, jsonParser,(req,res)=>{
    let idConsulta =req.body.idConsulta;
    let tipoConsulta = req.body.data.tipoConsulta;
    let nombreAnimal = req.body.data.nombreAnimal;

    let aux = moment(req.body.data.fecha).format("YYYY-MM-DD");
    let fecha = aux.concat(" "+req.body.data.hora+":00");     

    let emailVet =  req.body.data.emailVet;
    let nombreCliente = req.body.data.nombreCliente;
    let rutCliente = req.body.data.rutCliente;
    let descripcion = req.body.data.descripcion;
    let telefonoCliente = req.body.data.telefonoCliente;
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
router.delete('/eliminarconsulta',verifyToken,jsonParser ,(req, res) =>{
    const idConsulta = req.body.idConsulta;
    let sql = `delete from Consulta where idConsulta='${idConsulta}'`;
    connection.query(sql, (error, results, fields) =>{
        if(error) throw error;
        else{
            res.json({id:1})
        }
    })
});
module.exports = router;

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