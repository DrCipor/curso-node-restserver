const { response } = require("express");
const { Producto, Categoria } = require('../models')

const obtenerProductos = async(req, res = response) =>{

    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .skip(Number(desde)) 
        .limit(Number(limite))
    ])

    if(productos.length == 0){
        return res.json({
            msg: 'No existen productos en la base de datos'
        })
    }

    res.json({
        total,
        productos
    })
}

//populate  
const obtenerProducto = async(req, res = response) => {

    const { id } = req.params
    const producto = await Producto.findById(id)
                                   .populate('usuario','nombre')
                                   .populate('categoria','nombre')

    res.json(producto)
}

const crearProducto = async(req, res = response) =>{

    const  { estado , usuario, ...body}  = req.body

    const productoDB = await Producto.findOne( { nombre: body.nombre.toUpperCase() })

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        })
    }
    
    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto( data )

    // Guardar DB
    await producto.save()

    res.status(201).json(producto)
}

const actualizarProducto = async(req, res = response) =>{
    
    const { id } = req.params
    const { estado, usuario, ...data} = req.body

    if (data.nombre) {
        data.nombre  = data.nombre.toUpperCase()
    }

    data.usuario = req.usuario._id

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true })
    .populate('usuario', ['nombre','correo'])
    
    res.json(producto)
}

const borrarProducto = async(req, res = response) =>{
    
    const { id } = req.params
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true})
                                                    .populate('usuario',['nombre','rol','correo'])

    res.json({
        msg: 'El estado del producto cambio a false',
        productoBorrado,
    })
}


module.exports = {
    actualizarProducto,
    borrarProducto,
    crearProducto, 
    obtenerProductos,
    obtenerProducto,
}