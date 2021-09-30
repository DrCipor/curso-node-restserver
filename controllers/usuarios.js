const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')
const { model } = require('mongoose')

const usuariosGet = async(req = request, res = response) => {

    // const { q, nombre = 'No name', apikey}  = req.query
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query ).skip(Number(desde)) 
        .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async(req, res = response) => {

    
    const { nombre, correo, password, rol} = req.body // Se recoge todo lo que se envia 
    const usuario = new Usuario( {nombre, correo, password, rol} )

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync( password, salt)

    //Guardar en DB
    await usuario.save()

    res.json({
        msg: 'Usuario registrado exitosamente', 
        usuario
    })
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params
    const { _id, password, google, correo, ...resto} = req.body

    // Encriptar contraseña
    if ( password ) {

        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync( password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )
    
    res.json( usuario)
}

const usuariosDelete = async(req, res = response) => {
    
    const { id } = req.params

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({
        msg: 'El estado del usuario cambio a false',
        usuario
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
