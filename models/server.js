const express = require('express')
const cors = require('cors')

class Server{

    constructor() {
        this.app = express()//Creamos la aplicación de express
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // Middlewares > Funcion que siempre se ejecutara cuando levantemos el servidor
        this.middlewares()

        // Lectura y parseo del body
        this.app.use( express.json() )

        // Rutas de mi aplicación
        this.routes()

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