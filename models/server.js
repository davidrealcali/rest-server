const express = require('express')
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    
    constructor() {
        this.app = express();
        this.port  = process.env.PORT || 9090;
        this.usuariosPath =  '/api/usuarios';
        
        //Conectar a BD
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //Directorio publico
        this.app.use( express.static('public'));
        //Lectura y parseo del body
        this.app.use( express.json() );
        //CORS
        this.app.use(cors());
    }

    routes( ) {
        this.app.use( this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen( this.port , () => {
            console.log('Servidor corrriendo en puerto', this.port );
       });
    }
}

module.exports = Server;