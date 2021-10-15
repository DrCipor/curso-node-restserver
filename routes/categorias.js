const { Router } = require('express')
const { check } = require('express-validator')
const { crearCategoria, obtenerCategorias, borrarCategoria, actualizarCategoria, obtenerCategoria } = require('../controllers/categorias')
const { existeCategoriaPorId } = require('../helpers/db-validators')

const { validarJwt, validarCampos, esAdminRole } = require('../middlewares')

const router = Router()

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

// Obtener una categorias por ID - publico  
router.get('/:id',[
    check('id','No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria)

// Crear categoria - privado - cualquier persona con un token válido
router.post('/',[ 
    validarJwt,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos 
], crearCategoria)

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria)

// Borrar una categoria - admin
router.delete('/:id',[
    validarJwt,
    esAdminRole,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria)


module.exports = router