const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server{

    constructor() {
        this.app = express()//Creamos la aplicación de express
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // Conectar a base de datos
        this.conectarDB()

        // Middlewares > Funcion que siempre se ejecutara cuando levantemos el servidor
        this.middlewares()

        // Lectura y parseo del body
        this.app.use( express.json() )

        // Rutas de mi aplicación
        this.routes()

    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        // Directorio publico
        this.app.use( express.static('public'))
    }

    routes(){

        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto', this.port );
        }) 
    }
}

module.exports = Server