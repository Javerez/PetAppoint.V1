const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MySQLAdapter = require('@bot-whatsapp/database/mysql')

/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = 'localhost'
const MYSQL_DB_USER = 'root'
const MYSQL_DB_PASSWORD = ''
const MYSQL_DB_NAME = 'PetAppoint'
const MYSQL_DB_PORT = '3306'

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */
const flowPrincipal = addKeyword(['hola', 'buenos dias', 'ola']).addAnswer('🙌 Bienvenido IvetMascotas')
    .addAnswer('¿Necesita consultar horarios?', {capture:true}, (ctx,{fallBack}) => {
                switch(ctx.body){
                    case 'si' : console.log(ctx.body);break;
                    case 'no' : fallBack(); break;
                    default : return fallBack();
                }
            })
    .addAnswer('Gracias')

/*'👉 *Horarios* para consultar disponibilidad.',
            '--Si ya tiene una hora agendada',
            '👉 *Consulta* consultar hora agendada.',
            '👉 *Modificar* modificar hora agendada.',
            '👉 *Eliminar* eliminar hora agendada.'*/

const main = async () => {
    const adapterDB = new MySQLAdapter({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    })
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}

main()
