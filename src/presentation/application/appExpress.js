import express from 'express';
import cookieParser from 'cookie-parser';
import errorHandler from '../../presentation/middlewares/errorHandler.js';
import productsRouter from '../../presentation/routes/productsRouter.js'
import cartsRouter from '../../presentation/routes/cartsRouter.js'
import viewsRouter from '../../presentation/routes/views.router.js'
import usersRouter from '../../presentation/routes/usersRouter.js';
import sessionRouter from '../../presentation/routes/sessionRouter.js';
import rolesRouter from '../../presentation/routes/rolesRouter.js';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import nodemailer from 'nodemailer';

class AppExpress {

    init() {

        this.app = express();
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cookieParser()); // Cookies

    }

    build() {

        this.app.use(session({
            store: mongoStore.create({
                mongoUrl: process.env.DB_URI,
                ttl: 50
            }),
            secret: 'CoderS3cR3tC0D3',
            resave: false,
            saveUninitializad: false
        })) // Session
        this.app.use('/api/products', productsRouter);
        this.app.use('/api/carts', cartsRouter);
        this.app.use('/api/users', usersRouter);
        this.app.use('/api/session', sessionRouter);
        this.app.use('/api/roles', rolesRouter);
        this.app.use('/', viewsRouter)
        this.app.use(errorHandler);



    }

    listen() {
        const server = this.app.listen(8081, () => {
            console.log('Listening on port 8081');
        });

        return server
    }
}

export default AppExpress;


