const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey}  = req.query
    res.json({
        msg: 'get API - controlador',
        q, nombre, apikey
    })
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad} = req.body // Se recoge todo lo que se envia 

    res.json({
        msg: 'post API - usuariosPost',
        nombre, edad
    })
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params
        res.json({
        msg: 'put API - usuariosPut',
        id
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    })
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}
