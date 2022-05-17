const validaCampos = require('../middlewares/validar-campos');
const validarJWT   = require('../middlewares/validar-jwt.js');
const validaRoles  = require('../middlewares/validar-roles');

module.exports = {
    ...validaCampos, 
    ...validarJWT,
    ...validaRoles
}