const {Schema, model} = require('mongoose');



const userSchema = new Schema({
    name:{
        type:String,
        required:[true,'EL nombre es obligatorio'],
    },
    password:{
        type:String,
        required:[true,'La contrasena es obligatorio']
    },
    mail:{
        type:String,
        unique:true,
        required:[true,'El correo es obligatorio'],
    },
    img:{
        type:String
    },
    role:{
        type:String,
        emun:['ADMIN_ROLE','USER_ROLE'],
        required:true
    },
    state:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }

    
});

userSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject();
    return user;
}



module.exports = model('User',userSchema);