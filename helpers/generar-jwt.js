const jwt = require('jsonwebtoken')

const generarJWT = ( uid = '') => {

    return new Promise ( (resolve, reject) => {
        
        const payload = { uid } // User id

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, { // Firmar un webtoken
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err); 
                reject('No se pudo generar el token')
            } else{
                resolve(token)
            }
        })
    })
}

module.exports = {
    generarJWT
}