import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import { Server } from 'socket.io'
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoStore from 'connect-mongo';
import errorHandler from './presentation/middlewares/errorHandler.js';

import productsRouter from './presentation/routes/productsRouter.js'
import cartsRouter from './presentation/routes/cartsRouter.js'
import viewsRouter from './presentation/routes/views.router.js'
import usersRouter from './presentation/routes/usersRouter.js';
import sessionRouter from './presentation/routes/sessionRouter.js';
import rolesRouter from './presentation/routes/rolesRouter.js';

    
// Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // Cookies
app.use(session({
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_DB_URI,
        ttl: 50
    }),
    secret: 'CoderS3cR3tC0D3',
    resave: false,
    saveUninitializad: false    
})) // Session

mongoose.connect(process.env.MONGO_DB_URI)

// Express + WebSocket
const viewsPath = resolve('src/views');

// Handlebars
app.engine('handlebars', engine({
    layoutsDir: `${viewsPath}/layout`,
    defaultLayout: `${viewsPath}/layout/main.handlebars`
}));
app.set('view engine', 'handlebars');
app.set('views', viewsPath);

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter);
app.use('/api/session', sessionRouter);
app.use('/api/roles', rolesRouter);
app.use('/', viewsRouter)


// Middleware de manejo de erorres
app.use(errorHandler);

// Express ON
const httpServer = app.listen(8081, () => {
    console.log('Listening on port 8081');
});

const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {

    console.log('Cliente conectado')

    socket.on('chatRoom1', (data) => {

        console.log(data)

        socket.broadcast.emit('chatRoom1', data);

    });
})


export { socketServer }; 



