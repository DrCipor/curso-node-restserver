const { Router } = require('express')
const { check } = require('express-validator')

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios') 
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')

const { validarCampos, validarJwt, esAdminRole, tieneRole} = require('../middlewares')


const router = Router()

router.get('/', usuariosGet )

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength( {min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol permitido').isIn( ['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ), //Verificación personalizada
    validarCampos
],usuariosPost )

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut)

router.delete('/:id',[
    validarJwt,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE','NOSE_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch )


module.exports = router