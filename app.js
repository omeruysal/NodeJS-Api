const express = require('express');
const app = express();
const morgan = require('morgan') //gelen istekleri consolda gostermek icin
const mongoose = require('mongoose') //mongoya baglanabilmek icin

const productRoutes = require('./api/routes/ProductRoute');
const orderRoutes = require ('./api/routes/OrderRoute')
const userRoutes = require('./api/routes/UserRoute');



mongoose.connect("mongodb://localhost/deneme", {useNewUrlParser : true,useUnifiedTopology :true})
mongoose.connection.once("open", ()=> console.log("We connected to mongo"))
.on("error",error=>{
    console.log("Error is for mongodb ",error);
})


app.use(morgan('dev'))
app.use(express.urlencoded({extended : false}))
app.use(express.json()) //body json convert islemleri icin

app.use((req,res,next)=> //cors icin header ekliyoruz
{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH , DELETE , GET , PUT');
        return res.status(200).json({});
    }
    next();
    
})

app.use('/products',productRoutes); //bu url altindaki istekleri productRoutes handle edecek
app.use("/orders",orderRoutes)
app.use("/user", userRoutes);



app.use((req,res,next)=>{
    console.log("hata");
    const error = new Error('Not Found')
    error.status = 404;
    next(error);
})


app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error : {
            message : error.message
        }
    })
})

module.exports = app;