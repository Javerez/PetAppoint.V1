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
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'PetAppoint'
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
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'PetAppoint'
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
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'PetAppoint'
    });
    await new Promise((resolve, reject) => {
        connection.connect(function(error) {
        if (error) reject(error);
        console.log('Conexión exitosa');
        resolve();
        });
    });
    const results = await new Promise((resolve, reject) => {
        connection.query(`insert into consulta values ('null','${fecha}','${nombreAnimal}','${nombreCliente}','${rutCliente}','${telefonoCliente}','${emailVet}','${tipoConsulta}','${descripcion}')`
        , function (error, results) {
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
            '(Escriba "cancelar" para volver al inicio)',
            'Para continuar escriba okey'

        ],
        {capture:true}, async(ctx, {gotoFlow, flowDynamic, fallBack})=>{
            const body = ctx.body;
            if(body === 'cancelar'){
                return gotoFlow(flowPrincipal);
            }else if(body === 'okey'){
                await flowDynamic('Empecemos');
            }else{
                fallBack('Siga las instruciones porfavor');
                return gotoFlow(flowAgendarConsulta);
            }
        })
    .addAnswer(
        [   'Escriba su datos de la siguiente manera',
            'yyyy-mm-dd hh:mm:ss nombreMascota nombreCliente 11.111.111-1 912334566',
            'Ejemplo: 2000-9-11 10:30:00 michi nicolas 20.326.866.2 945342322'
        ],
        {capture:true}, async(ctx, {flowDynamic, gotoFlow})=>{
            const body = ctx.body;
            const datos = body.match(/\S+/g);
            await flowDynamic("Datos consulta: \nFecha: " + datos[0] + '\nHora: ' + datos[1] + '\nMascota: ' + datos[2] + '\nCliente: ' + datos[3] + 
            '\nRut: ' + datos[4] + '\nTelefono: ' + datos[5]);
            const result = await agregarConsulta(datos);
            if (result !== 1) {
                return (
                  fallBack("No se pudo agendar"),
                  gotoFlow(flowAgendarConsulta)
                );
              } else {
                const mensaje = 'Se agendo con exito';
                await flowDynamic(mensaje);
                gotoFlow(flowPrincipal);
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
