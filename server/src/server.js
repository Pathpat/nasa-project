const http = require('http');

const  app = require('./app');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () =>{
    console.log(`Server listen on PORT ${PORT}....`)
});






