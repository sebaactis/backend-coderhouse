/* import { engine } from 'express-handlebars';
import { resolve } from 'path';
import { Server } from 'socket.io' */

import dotenv from 'dotenv'
dotenv.config();

import mongoose from 'mongoose';
import AppFactory from './presentation/factories/appFactory.js';

mongoose.connect(process.env.MONGO_DB_URI)


const app = AppFactory.create(process.env.APPLICATION)

app.init();
app.build();
app.listen();


// Express + WebSocket
/* const viewsPath = resolve('src/views'); */

/* // Handlebars
app.engine('handlebars', engine({
    layoutsDir: `${viewsPath}/layout`,
    defaultLayout: `${viewsPath}/layout/main.handlebars`
}));
app.set('view engine', 'handlebars');
app.set('views', viewsPath); */


/* const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {

    console.log('Cliente conectado')

    socket.on('chatRoom1', (data) => {

        console.log(data)

        socket.broadcast.emit('chatRoom1', data);

    });
}) */


/* export { socketServer };  */



