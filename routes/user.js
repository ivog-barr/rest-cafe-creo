const {Router} = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userDelete } = require('../controllers/userControllers');
const { isRoleValid, emailExist, existeUsuarioId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validarCampos');


const userRouter = new Router();


userRouter.get('/',userGet);




userRouter.post('/',[
    check('mail','El correo no es valido').isEmail(),
    check('mail','El correo ya existe').custom(emailExist),
    check('name','El Nombre es obligatorio').not().isEmpty(),
    check('password','La password es obligatoria y mas de 6 letras').isLength({min:6}),
    check('role').custom(isRoleValid),
    validarCampos
],userPost);



userRouter.put('/:id',[
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('role').custom(isRoleValid),
    validarCampos

],userPut);

userRouter.delete('/:id',[
    check('id','NO es un id valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos

],userDelete)


module.exports = {
    userRouter
}