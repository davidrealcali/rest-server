const { Router } = require('express');
const { usuariosGet, usuariosPut ,usuariosPost, usuariosDelete } = require('../controllers/user');
const { check } = require('express-validator');
const { isRoleValido, isValidEmail, existeUsuarioPorId } = require('../helpers/db-validators');

//Middlewares
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt.js');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const {
    validarCampos,
    validarJWT, 
    esAdminRole, 
    tieneRole
} = require('../middlewares');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( isRoleValido ),
    validarCampos
],  usuariosPut );

router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( isValidEmail ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 caracteres').isLength( { min: 6} ),
    check('rol').custom( isRoleValido ),
    //check('rol', 'No es un error valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
] , usuariosPost );

router.delete('/:id', [
    validarJWT,
    esAdminRole, //El usuario tiene que ser administrador,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],
usuariosDelete );

module.exports = router;