const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')
const BBDD = require('mysql')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MySQLAdapter = require('@bot-whatsapp/database/mysql')

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
    const results = await new Promise((resolve, reject) => {
      connection.query(
        `select * FROM consulta WHERE fecha='${fecha}'`,
        function (error, results1) {
          if (error) {
            reject(error);
          } else if (results1 !== "") {
            resolve(2);
          } else {
            connection.query(
              `insert into consulta values ('${null}','${fecha}','${nombreAnimal}','${nombreCliente}','${rutCliente}','${telefonoCliente}','${emailVet}','${tipoConsulta}','${descripcion}')`,
              function (error, results) {
                if (error) {
                  reject(error);
                } else {
                  resolve(1);
                }
              }
            );
          }
        }
      );
    });
    connection.end();
    return results;
}

async function verificacionDatos(datos){
    const fecha = datos[0];
    const hora = datos[1];
    const nombreAnimal = datos[2].toLowerCase();
    const nombreCliente = datos[3].toLowerCase();
    const rutCliente = datos[4];
    const telefonoCliente = datos[5];
    const numeros ="0123456789";
    const letras="abcdefghyjklmnñopqrstuvwxyz";
    var año;
    var mes;
    var dia;
    for(i=0; i<fecha.length; i++){
        if(fecha.length!==10){
            return 1;
        }
        if(fecha.charAt(i)!=='-'){
            if (letras.indexOf(fecha.charAt(i),0)!=-1){
                return 1;
            }else if(i<4){
                año = año + fecha.charAt(i);
            }else if(i<7){
                if(parseInt(año) < 2023){
                    return 1;
                }
                mes = mes + fecha.charAt(i);
            }else if(i<=9){
                if(parseInt(mes) >12){
                    return 1;
                }
                dia = dia + fecha.charAt(i);
                if(i === 9){
                    if(parseInt(dia)>31 && (mes === 1 || mes === 3 || mes === 5 || mes === 7 || mes === 8 || mes === 10 || mes === 12)){
                        return 1;
                    }else if(parseInt(dia)>30 && (mes === 4 || mes === 6 || mes === 9 || mes === 11)){
                        return 1;
                    }else if(parseInt(dia)>28 && mes === 2){
                        return 1;
                    }
                }
            }
        }else if(i!==4 || i!=7){
            return 1;
        }
    }
    for(i=0; i<hora.length; i++){
        if(hora.length!==8){
            return 2;
        }
        if(i!== 2 || i!==5){
            if (letras.indexOf(hora.charAt(i),0)!=-1){
                return 2;
            }else if(i===0 && parseInt(hora.charAt(i)) >2){
                return 2;
            }else if(i===1 && parseInt(hora.charAt(i)) >3){
                return 2;
            }else if(i===3 && parseInt(hora.charAt(i)) >5){
                return 2;
            }else if(i===4 && parseInt(hora.charAt(i)) >9){
                return 2;
            }else if(i===6 && parseInt(hora.charAt(i)) >5){
                return 2;
            }else if(i===7 && parseInt(hora.charAt(i)) >9){
                return 2;
            }
        }else if(hora.charAt(i) !== ':'){
            return 2;
        }
    }
    for(i=0; i<nombreAnimal.length; i++){
        if (numeros.indexOf(nombreAnimal.charAt(i),0)!=-1){
           return 3;
        }
    }
    for(i=0; i<nombreCliente.length; i++){
        if (numeros.indexOf(nombreCliente.charAt(i),0)!=-1){
           return 4;
        }
    }
    for(i=0; i<rutCliente.length; i++){
        if(rutCliente.length >12 || rutCliente.length <11)
        if(rutCliente.charAt(i)!=='-'){
            if(rutCliente.charAt(i)!=='.'){
                if(rutCliente.charAt(i)==='k' && i===(rutCliente.length-1)){
                    return 7;
                }
                if (letras.indexOf(rutCliente.charAt(i),0)!=-1){
                    return 5;
                }
            }else if(rutCliente.charAt(i) === '.' && (i!==1 || i!==2)){
                return 5;
            }
        }else if(rutCliente.charAt(i) === '-' && (i!==10 || i!==9)){
            return 5;
        }
    }
    for(i=0; i<telefonoCliente.length; i++){
        if(telefonoCliente.length !== 9){
            return 6;
        }
        if (letras.indexOf(telefonoCliente.charAt(i),0)!=-1){
            return 6;
        }
    }
    return 7;
}

/*async function verificacionRut(rut){

}*/

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
        ['Ingrese su rut para confirmar su agenda',
            '(Escriba "cancelar" para volver al inicio)'
        ])
    .addAnswer('(Ej: 11.111.111-1)', {capture:true}, async (ctx,{gotoFlow, fallBack, flowDynamic, endFlow})=>{
                const body = ctx.body;
                if(body.length>12 || body.length<11){
                    return fallBack('Ingrese un rut valido'), gotoFlow(flowConsultasAgendadas);
                }else{
                    const results = await ObtenerConsultasRut(body);
                    if (results[0].rutCliente === "") {
                        return fallBack('No existe una hora con el rut ingresado'), gotoFlow(flowConsultasAgendadas);
                    }else{
                        const mensaje =
                        "Fecha: " +
                        results[0].fecha +
                        "\nNombre mascota: " +
                        results[0].nombreAnimal +
                        "\nTipo de consulta: " +
                        results[0].tipoConsulta;
                        await flowDynamic(mensaje);
                        gotoFlow(flowConsulta);
                    }
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
    '(Escriba "cancelar" para volver al inicio)',
  ])
  .addAnswer(
    "(Ej: 11.111.111-1)",
    { capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
      const body = ctx.body;
      if(body === 'cancelar')
      {
        gotoFlow(flowPrincipal);
      }
      if (body.length>12 || body.length<11) {
        return (
          fallBack("Ingrese un rut valido"), gotoFlow(flowEliminarConsulta)
        );
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


const flowAgendarConsulta = addKeyword(['asdasdasdasdasdasd'])
    .addAnswer(
        ['Para agendarle una hora se le pedira llenar un formulario',
            '|Escriba *cancelar* para volver al inicio|',
            '|Para continuar escriba *okey*|'

        ],
        {capture:true}, async(ctx, {gotoFlow, flowDynamic, fallBack})=>{
            const body = ctx.body;
            if(body === 'cancelar' || body === 'Cancelar'){
                return gotoFlow(flowPrincipal);
            }else if(body === 'Okey' || body === 'okey'){
                await flowDynamic('Empecemos');
            }else{
                fallBack('Siga las instruciones porfavor');
                return gotoFlow(flowAgendarConsulta);
            }
        })
    .addAnswer(
        [   'Escriba su datos de la siguiente manera',
            'yyyy-mm-dd hh:mm:ss nombreMascota nombreCliente 11.111.111-1 912334566',
            '*Ejemplo: 2000-9-11 10:30:00 michi nicolas 20.326.866-2 945342322*'
        ],
        {capture:true}, async(ctx, {flowDynamic, gotoFlow, fallBack})=>{
            const body = ctx.body;
            if(body === 'cancelar' || body === 'Cancelar'){
                return gotoFlow(flowPrincipal);
            }
            const datos = body.match(/\S+/g);
            const veri = await verificacionDatos(datos);
            if(veri !== 7){
                switch(veri){
                    case 1: fallBack("Ingrese una fecha valida segun el formato");
                            await gotoFlow(flowAgendarConsulta);
                            break;
                    case 2: fallBack("Ingrese una hora valida segun el formato");
                            await gotoFlow(flowAgendarConsulta);
                            break;
                    case 3: fallBack("El nombre de la mascota no debe incluir numeros");
                            await gotoFlow(flowAgendarConsulta);
                            break;
                    case 4: fallBack("Su nombre no debe incluir numeros");
                            await gotoFlow(flowAgendarConsulta);
                            break;
                    case 5: fallBack("Ingrese un rut valido segun el formato");
                            await gotoFlow(flowAgendarConsulta);
                            break;
                    case 6: fallBack("Ingrese un telefono valido");
                            await gotoFlow(flowAgendarConsulta);
                            break;
                }
            }else{
                await flowDynamic("Datos consulta: \nFecha: " + datos[0] + '\nHora: ' + datos[1] + '\nMascota: ' + datos[2] + '\nCliente: ' + datos[3] + 
                '\nRut: ' + datos[4] + '\nTelefono: ' + datos[5]);
                const result = await agregarConsulta(datos);
                if (result === 2){
                    return (
                        fallBack("Ya existe una consulta para esa fecha"),
                        gotoFlow(flowAgendarConsulta)
                    );
                }else if(result === 1){
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
