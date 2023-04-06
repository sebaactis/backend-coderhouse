import express from 'express';
import productsRouter from './routes/productsRouter.js'
import cartsRouter from './routes/cartsRouter.js'
import viewsRouter from './routes/views.router.js'
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import { Server } from 'socket.io'

// Express
const app = express();
app.use(express.urlencoded({ extended: true }));

// Express ON
const httpServer = app.listen(8080, () => {
    console.log('Listening on port 8080');
});

// Express + WebSocket
const socketServer = new Server(httpServer);
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
app.use('/', viewsRouter)
app.use(express.json());

socketServer.on('connection', socket => {

    console.log('Cliente conectado')

    socket.on('chatRoom1', (data) => {

        console.log(data)

        socket.broadcast.emit('chatRoom1', data);

    });



})



