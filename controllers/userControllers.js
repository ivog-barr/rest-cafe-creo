const {request,response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');



const userGet = async (req = request, res =response)=>{
    const {limite = 5 , desde = 0} = req.query

    const  users = await User.find({state:true})
        .skip(Number(desde))
        .limit(Number(limite));
    
    const total = await User.countDocuments({state:true});
    res.json({
        total,
        users
    })

}




const userPost  = async(req = request, res = response)=>{
    
    const {name,password,mail,role} = req.body;
    const user = new User({
        name,
        password,
        mail,
        role
    });
    
    //Encriptar la contrasena
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password,salt);
    
    await user.save()

    res.json({
        msg:'Hola desde POST',
        user
    })
}









const userPut = async(req= request, res=response)=>{
    const {id} = req.params;
    const {_id, password, google,mail,  ...resto} = req.body;
    //TODO: Validar contra BDD

    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password,salt);
    }

    const user = await User.findByIdAndUpdate(id, resto)




    res.json({
        msg:'Hola desde PUT',
        user
    })
};

const userDelete = async(req=request, res=response)=>{
    const {id} = req.params;

    //Borrarlo fisicamente
    // const user = await User.findByIdAndDelete(id);
    
    const user = await User.findByIdAndUpdate(id,{state:false});
    res.json({
        msg:"HOLA DESDE EL DELETE",
        user
    });

}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}