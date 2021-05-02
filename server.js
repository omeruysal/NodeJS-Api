const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);




// var express = require('express');  //bu sekilde de server olusturabirdik ayni amaca hizmet ederler fakat aralarinda kullanis acisindan farkliliklar olabilir. 
// var app = express();                 //Cunku http nesnesinie ayri olarak ihtiyacimiz olabilir. Ornegin socket.io kullaniminda
                                        //app.listen da bize http instance i doner fakat ufak konfigurasyon yapmamiz gerekir

// app.listen(1234);




// http instance ile setup asamasinda mudahale edebiliriz , asagidaki gibi. Express ile app kullandigimiz icin mudahale edemeyiz

// var https = require('https');
// var server = https.createServer(app).listen(config.port, function() {
//     console.log('Https App started');
// });


//app.listen arka planda calisma sekli - Expreess documentation:  

// app.listen = function () {
//     var server = http.createServer(this)
//     return server.listen.apply(server, arguments)
//   }