const { Router } = require('express')
const { check } = require('express-validator')
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto,borrarProducto } = require('../controllers/productos')
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators')

const { validarJwt, validarCampos, esAdminRole } = require('../middlewares')

const router = Router()

// Obtener todos los productos - publico
router.get('/', obtenerProductos)

// Obtener una categorias por ID - publico  
router.get('/:id',[
    check('id','No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto)

// Crear producto - privado - cualquier persona con un token válido
router.post('/', [
    validarJwt,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un ID de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos 
], crearProducto)

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJwt,
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto )

// Borrar una categoria - admin
router.delete('/:id',[
    validarJwt,
    esAdminRole,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto)


module.exports = router
