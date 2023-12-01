const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')
const BBDD = require('mysql')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MySQLAdapter = require('@bot-whatsapp/database/mysql')

const formulario = [];

const MYSQL_DB_HOST = 'localhost'
const MYSQL_DB_USER = 'root'
const MYSQL_DB_PASSWORD = ''
const MYSQL_DB_NAME = 'PetAppoint'
const MYSQL_DB_PORT = '3306'

async function ObtenerConsultasRut(rut) {
    const rutCliente = rut;
    const connection = BBDD.createConnection({
        host: MYSQL_DB_HOST,
        port: MYSQL_DB_PORT,
        user: MYSQL_DB_USER,
        password: MYSQL_DB_PASSWORD,
        database: MYSQL_DB_NAME
    });
    await new Promise((resolve, reject) => {
        connection.connect(function(error) {
        if (error) reject(error);
        console.log('Conexión exitosa');
        resolve();
        });
    });
    const results = await new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM consulta WHERE rutCliente='${rutCliente}'`, function (error, results) {
            if (error) {
            reject(error);
        } else {
            resolve(results);
        }
        });
    });
    connection.end();
    return results;
}

async function EliminarConsulta(rut) {
    const rutCliente = rut;
    const connection = BBDD.createConnection({
        host: MYSQL_DB_HOST,
        port: MYSQL_DB_PORT,
        user: MYSQL_DB_USER,
        password: MYSQL_DB_PASSWORD,
        database: MYSQL_DB_NAME
    });
    await new Promise((resolve, reject) => {
        connection.connect(function(error) {
        if (error) reject(error);
        console.log('Conexión exitosa');
        resolve();
        });
    });
    const results = await new Promise((resolve, reject) => {
        connection.query(`DELETE FROM consulta WHERE rutCliente='${rutCliente}'`, function (error, results) {
            if (error) {
            reject(error);
        } else {
            resolve(1);
        }
        });
    });
    connection.end();
    return 1;
}

async function agregarConsulta(datos) {
    const fecha = datos[0] + 'T' + datos[1] + 'Z';
    const nombreAnimal = datos[2];
    const nombreCliente = datos[3];
    const rutCliente = datos[4];
    const telefonoCliente = datos[5];
    const emailVet = 'juan@example';
    const tipoConsulta = 'Revisión';
    const descripcion = 'Se le hara un chequeo a la mascota'
    const connection = BBDD.createConnection({
        host: MYSQL_DB_HOST,
        port: MYSQL_DB_PORT,
        user: MYSQL_DB_USER,
        password: MYSQL_DB_PASSWORD,
        database: MYSQL_DB_NAME
    });
    await new Promise((resolve, reject) => {
        connection.connect(function(error) {
        if (error) reject(error);
        console.log('Conexión exitosa');
        resolve();
        });
    });
    try {
        const results1 = await new Promise((resolve, reject) => {
          connection.query(
            `SELECT * FROM consulta WHERE fecha = ?`,
            [fecha],
            function (error, existingResults) {
              if (error) {
                reject(error);
              } else {
                resolve(existingResults);
              }
            }
          );
        });
      
        if (results1.length > 0) {
          // La fecha ya existe en la base de datos
          connection.end();
          return 2;
        } else {
          const results2 = await new Promise((resolve, reject) => {
            connection.query(
              `INSERT INTO consulta VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [fecha, nombreAnimal, nombreCliente, rutCliente, telefonoCliente, emailVet, tipoConsulta, descripcion],
              function (error, insertionResults) {
                if (error) {
                  reject(error);
                } else {
                  resolve(insertionResults);
                }
              }
            );
          });
      
          connection.end();
          return 1;
        }
      } catch (error) {
        // Manejo de errores
        connection.end();
        throw error;
      }
      
}


function getFullMonth(date){
    const month = date.getMonth()+1
    return month < 10 ? '0'+month : month
}

function getFullDate(date){
    const day = date.getDate()
    return day < 10 ? '0'+day : day
}

async function validarFormatoFecha(fecha) {
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((fecha.match(RegExPattern)) && (fecha!='')) {
          return true;
    } else {
          return false;
    }
}

async function validarFormatoHora(hora) {
    var RegExPattern = /^(d{1,2}):(d{2})(:(d{2}))?(s?())?$/;
    if ((hora.match(RegExPattern)) && (hora!='')) {
          return true;
    } else {
          return false;
    }
}

async function verificacionRut(rut){
    var rutEntero;
    var DV; 
    for(i=0; i<rut.length; i++){
        if(rut.charAt(i)!=='-' || rut.charAt(i)!== '.'){
            if(i == rut.length - 1){
                DV = rut.charAt(i);
                DV = DV.toLowerCase();
            }else{
                rutEntero = rutEntero + rut.charAt(i);
            }
        }
    }
    if(rutEntero.length<7 || rutEntero.length>8)
    {
        return false;
    }else{
        if(DV !== 'k' || parseInt(DV)<0 || parseInt(DV)>9){
            return false;
        }
    }
    return true;
}

async function validarFormatoMascota(mascota) {
    const numeros ="0123456789";
    const nombreM = mascota.toLowerCase();
    for(i=0; i<nombreM.length; i++){
        if (numeros.indexOf(nombreM.charAt(i),0)!=-1){
           return false;
        }
    }
    return true;
}

async function validarFormatoCliente(cliente) {
    const numeros ="0123456789";
    const dueno = cliente.toLowerCase();
    for(i=0; i<dueno.length; i++){
        if (numeros.indexOf(dueno.charAt(i),0)!=-1){
           return false;
        }
    }
    return true;
}

async function validarFormatoTelefono(telefonoCliente) {
    const letras="abcdefghyjklmnñopqrstuvwxyz";
    for(i=0; i<telefonoCliente.length; i++){
        if(telefonoCliente.length !== 9){
            return false;
        }
        if (letras.indexOf(telefonoCliente.charAt(i),0)!=-1){
            return false;
        }
    }
    return true;
}

async function existeHora(hora){
    var horaH = hora.split(":");
    var hora = horaH[0];
    var minuto = horaH[1];
    var segundo = horaH[2];
    if(parseInt(hora)<0 && parseInt(hora) > 23 ){
        return false;
    }
    if(parseInt(minuto)<0 && parseInt(minuto) > 59 ){
        return false;
    }
    if(parseInt(segundo)<0 && parseInt(segundo) >59 ){
        return false;
    }
    return true;
}

async function existeFecha(fecha){
    var fechaf = fecha.split("-");
    var day = fechaf[0];
    var month = fechaf[1];
    var year = fechaf[2];
    var date = new Date(year,month,'0');
    if((day-0)>(date.getDate()-0)){
        return false;
    }
    return true;
}

async function validarFechaMenorActual(date){
    var fecha = date.split("-");
    var x=new Date(fecha[2],fecha[1]-1,fecha[0]);
    var today = new Date();
    if (x < today)
      return false;
    else
      return true;
}

const flowPrincipal = addKeyword(['hola', 'buenos dias', 'ola', 'oe'])
    .addAnswer(
        ['🙌 Bienvenido IvetMascotas',
            '¿En que le podemos ayudar?',
            'Escriba el número de acuerdo a tu consulta',
            '1 Agendar consulta',
            '2 Consultar hora agendada',
            '3 Terminar',
        ],
        {capture:true}, async(ctx, {gotoFlow, fallBack, endFlow})=>{
            const body = ctx.body;
            const opcion = body.match(/\d+/);
            if(!opcion || (opcion[0]!== '1' && opcion[0]!== '2' && opcion[0]!== '3')){
                return fallBack('Ingrese un número valido segun el menu'), gotoFlow(flowPrincipal);
            }
            switch(opcion[0]){
                case '1':
                    await gotoFlow(flowAgendarConsulta);
                    break;
                case '2':
                    await gotoFlow(flowConsultasAgendadas);
                    break;
                case '3':
                    await endFlow('Adios');
                    break;
            }
        })

const flowConsultasAgendadas = addKeyword(['aaaaaaaaaaaaaaaaaaaaaaaaaaaaa'])
    .addAnswer(
        [
            'Ingrese su rut para confirmar su agenda',
            'Ej: *11.111.111-1*'
        ])
    .addAnswer('|Para regresar escriba *1*|', {capture:true}, async (ctx,{gotoFlow, fallBack, flowDynamic, endFlow})=>{
                const body = ctx.body;
                if(body === "1"){
                    return gotoFlow(flowPrincipal);
                }else if(verificacionRut(body)){
                    const results = await ObtenerConsultasRut(body);
                    if (results[0].rutCliente === "") {
                        return fallBack('No existe una hora con el rut ingresado'), gotoFlow(flowConsultasAgendadas);
                    }else{
                        const mes = getFullMonth(results[0].fecha);
                        const dia = getFullDate(results[0].fecha);
                        const mensaje =
                        "Fecha: " +
                        results[0].fecha.getFullYear() +
                        "-" +
                        mes +
                        "-" +
                        dia +
                        " " +
                        results[0].fecha.getHours() +
                        ":" +
                        results[0].fecha.getMinutes() +
                        "\nNombre mascota: " +
                        results[0].nombreAnimal +
                        "\nTipo de consulta: " +
                        results[0].tipoConsulta;
                        await flowDynamic(mensaje);
                        gotoFlow(flowConsulta);
                    }
                }else{
                    fallBack("Ingrese un rut valido segun el formato");
                    gotoFlow(flowConsultasAgendadas);
                }
    })

const flowConsulta = addKeyword(['asdasdasdasdasdasdasdasdasd'])
    .addAnswer(
        [
            '¿Qué desea hacer con su consulta?',
            'Escriba el número de su decisión',
            '1 Eliminar hora agendada',
            '2 Cancelar',
        ],
        {capture:true}, async(ctx, {gotoFlow, fallBack, endFlow})=>{
            const body = ctx.body;
            const opcion = body.match(/\d+/);
            if(!opcion || (opcion[0]!== '1' && opcion[0]!== '2')){
                return fallBack('Ingrese un número valido segun las opciones'), gotoFlow(flowConsulta);
            }
            switch(opcion[0]){
                case '1':
                    await gotoFlow(flowEliminarConsulta);
                    break;
                case '2':
                    await gotoFlow(flowPrincipal);
                    break;
            }
        })

const flowEliminarConsulta = addKeyword(["youaremyespecialtuturururuasdas"])
  .addAnswer([
    "Ingrese su rut para eliminar su consulta",
    'Ej: *11.111.111-1*',
  ])
  .addAnswer(
    "|Para regresar escriba 1|",
    { capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
      const body = ctx.body;
      if(body === '1')
      {
        gotoFlow(flowConsulta);
      }
      if (!verificacionRut(body)) {
        fallBack("Ingrese un rut valido"), gotoFlow(flowEliminarConsulta);
      } else {
        const results = await EliminarConsulta(body);
        if (results !== 1) {
          return (
            fallBack("Rut no valido"),
            gotoFlow(flowEliminarConsulta)
          );
        } else {
          const mensaje = 'Se a eliminado su consulta con exito';
          await flowDynamic(mensaje);
          gotoFlow(flowPrincipal);
        }
      }
    }
  );

const flowAgendarConsulta = addKeyword(["asdasdasdasdasdasd"])
  .addAnswer(
    [
      "Para agendarle una hora se le pedira llenar un formulario",
      "|Para continuar escriba *1*|",
      "|Para regresar al inicio *2*|",
    ],
    { capture: true },
    async (ctx, { gotoFlow, flowDynamic, fallBack }) => {
      const body = ctx.body;
      if (body === "2") {
        return gotoFlow(flowPrincipal);
      } else if (body === "1") {
        await flowDynamic("Empecemos");
      } else {
        fallBack("Siga las instruciones porfavor");
        return gotoFlow(flowAgendarConsulta);
      }
    }
  )
  .addAnswer(
    [
        "Ingrese una fecha con el formato YYYY-MM-DD",
        "Ejemplo: 2024-02-03"
    ],
    { capture: true},
    async (ctx, {flowDynamic, gotoFlow, fallBack}) => {
        const body = ctx.body;
        if (body === "2") {
          return gotoFlow(flowPrincipal);
        } else if (validarFormatoFecha(body)) {
            if (existeFecha(body)) {
                if(validarFechaMenorActual(body)){
                    formulario[0] = body;
                }else{
                    fallBack("La fecha introducida no es valida");
                    await gotoFlow(flowAgendarConsulta);
                }
            } else {
                fallBack("La fecha introducida no existe");
                await gotoFlow(flowAgendarConsulta);
            }
        }else{
            fallBack("Ingrese una fecha valida segun el formato");
            await gotoFlow(flowAgendarConsulta);
        }

    }
  )
  .addAnswer(
    [
        "Ingrese una hora con el formato HH:MM",
        "Ejemplo: 16:30"
    ],
    { capture:true},
    async(ctx, {flowDynamic, gotoFlow, fallBack}) =>{
        const body2 = ctx.body;
        if (body2 === "2") {
          return gotoFlow(flowPrincipal);
        }
        const body = body2 + ':00';
        if (validarFormatoHora(body)) {
            if (existeHora(body)) {
                formulario[1] = body;
            } else {
                fallBack("La fecha introducida no existe");
                await gotoFlow(flowAgendarConsulta);
            }
        }else{
            fallBack("Ingrese una fecha valida segun el formato");
            await gotoFlow(flowAgendarConsulta);
        }
    }
  )
  .addAnswer(
    [
        "Ingrese el nombre de su mascota",
        "Ejemplo: Firulais"
    ],
    { capture:true},
    async(ctx, {flowDynamic, gotoFlow, fallBack}) =>{
        const body = ctx.body;
        if (body === "2") {
          return gotoFlow(flowPrincipal);
        }else if (validarFormatoMascota(body)) {
            formulario[2] = body;
        }else{
            fallBack("Ingrese un nombre valido segun el formato");
            await gotoFlow(flowAgendarConsulta);
        }
    }
  )
  .addAnswer(
    [
        "Ingrese su nombre",
        "Ejemplo: José Arellano"
    ],
    { capture:true},
    async(ctx, {flowDynamic, gotoFlow, fallBack}) =>{
        const body = ctx.body;
        if (body === "2") {
          return gotoFlow(flowPrincipal);
        }else if (validarFormatoCliente(body)) {
            formulario[3] = body;
        }else{
            fallBack("Ingrese un nombre valido segun el formato");
            await gotoFlow(flowAgendarConsulta);
        }
    }
  )
  .addAnswer(
    [
        "Ingrese su RUT",
        "Ejemplo: 12.345.678-9"
    ],
    { capture:true},
    async(ctx, {flowDynamic, gotoFlow, fallBack}) =>{
        const body = ctx.body;
        if (body === "2") {
          return gotoFlow(flowPrincipal);
        }else if (verificacionRut(body)) {
            formulario[4] = body;
        }else{
            fallBack("Ingrese un rut valido segun el formato");
            await gotoFlow(flowAgendarConsulta);
        }
    }
  )
  .addAnswer(
    [
        "Ingrese su telefono",
        "Ejemplo: 123456789"
    ],
    { capture:true},
    async(ctx, {flowDynamic, gotoFlow, fallBack}) =>{
        const body = ctx.body;
        if (body === "2") {
          return gotoFlow(flowPrincipal);
        }else if (validarFormatoTelefono(body)) {
            formulario[5] = body;
        }else{
            fallBack("Ingrese un telefono valido segun el formato");
            await gotoFlow(flowAgendarConsulta);
        }
        await flowDynamic("Datos consulta: \nFecha: " + formulario[0] + '\nHora: ' + formulario[1] + '\nMascota: ' + formulario[2] + '\nCliente: ' + formulario[3] + 
                '\nRut: ' + formulario[4] + '\nTelefono: ' + formulario[5]);
                const result = await agregarConsulta(formulario);
                if (result == 2){
                    return (
                        fallBack("Ya existe una consulta para esa fecha"),
                        gotoFlow(flowAgendarConsulta)
                    );
                }else if(result == 1){
                    const mensaje = 'Se agendo con exito';
                    await flowDynamic(mensaje);
                    gotoFlow(flowPrincipal);
                }else{
                    return (
                        fallBack("No se pudo agendar"),
                        gotoFlow(flowAgendarConsulta)
                    );
                }
    }
  )

const main = async () => {
    const adapterDB = new MySQLAdapter({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    })
    const adapterFlow = createFlow([flowPrincipal, flowConsultasAgendadas, flowAgendarConsulta, flowConsulta, flowEliminarConsulta])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}

main()
