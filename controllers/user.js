const { response, request } = require('express');

const usuariosGet = ( req = request , res = response ) => {

    const { nombre = 'none' , edad } = req.query;

    res.json({
        message: 'get API - controlador',
        nombre,
        edad
    });
}

const usuariosPut = ( req, res = response) => {

    const { id } = req.params;

    res.json({
        message: 'put API - controlador',
        id,
    });
}

const usuariosPost = ( req, res ) => {
    const { nombre , edad } = req.body;
    res.json({
        message: 'post API - controlador',
        nombre,
        edad
    });
}

const usuariosDelete = ( req, res ) => {
    res.json({
        message: 'delete API',
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}