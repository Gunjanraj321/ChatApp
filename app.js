const http = require('http');
const express =require('express');

const sequelize = require('./util/db');

const app = express();

app.use(express.json());
app.use(express.static('public'));

const server = http.createServer(app);

const port = process.env.PORT || 3000;

async function initiate(){
    try{
        const res = await sequelize.sync();
        server.listen(port,()=>{
            console.log('server running');
        })
    }catch(err){
        console.log('Error occured during server initialization')
    }
}
initiate();

