const mongoose = require('mongoose');


mongoose.set('strictQuery', false)

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log('La base de datos ha conectado Exitosamente');
        
    } catch (error) {
        console.log(error)
        throw new error("Error al iniciar la base de datos");
        
    }
}


module.exports = {
    dbConnection,
}