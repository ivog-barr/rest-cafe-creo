const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./db/config');
const { userRouter } = require('./routes/user');
const app = express();

require('dotenv').config();

dbConnection();

app.use(express.json());
app.use(cors());


app.use('/api',userRouter );

app.listen(process.env.PORT,()=>{
    console.log('server running on port 3000');
})
