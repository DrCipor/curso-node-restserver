const { response } = require("express")


const esAdminRole = ( req, res = response, next) =>{

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }

    if (req.usuario.rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${req.usuario.nombre} no es administrador - No puede hacer esto`
        })
    }    
    next()
}

const tieneRole = ( ...roles ) =>{ // Recibir un numero n de parametros

    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }

        if (!roles.includes( req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            })
        }
        
        next()
    }
}

module.exports = {
    esAdminRole, tieneRole
}