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
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import passwordRouter from '../routes/passwordRouter.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'
import { addLogger } from '../../utils/logger.js';
import CronManager from '../../domain/managers/CronManager.js';

const manager = new CronManager();
class AppExpress {

    init() {

        this.app = express();
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cookieParser()); // Cookies
        this.app.use(addLogger);

        // Handlebars
        const viewsPath = resolve('src/presentation/views');
        this.app.engine('handlebars', engine({
            layoutsDir: `${viewsPath}/layout`,
            defaultLayout: `${viewsPath}/layout/main.handlebars`
        }));
        this.app.set('view engine', 'handlebars');
        this.app.set('views', viewsPath);

        // Swagger
        const swaggerPath = resolve('docs/**/*.yaml')
        const swaggerOptions = {
            definition: {
                openapi: '3.0.1',
                info: {
                    title: "Documentacion API de E-Commerce Proyecto de Coderhouse",
                    description: "Documentacion para poder probar la API"
                }
            },
            apis: [swaggerPath]
        }

        const specs = swaggerJSDoc(swaggerOptions)
        this.app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
        
        manager.deleteUsersByLastLogin();

    }


    build() {

        this.app.use(session({
            store: mongoStore.create({
                mongoUrl: process.env.DB_URI,
                ttl: 200
            }),
            secret: 'CoderS3cR3tC0D3',
            resave: false,
            saveUninitializad: false
        }))
        this.app.use('/api/products', productsRouter);
        this.app.use('/api/carts', cartsRouter);
        this.app.use('/api/users', usersRouter);
        this.app.use('/api/session', sessionRouter);
        this.app.use('/api/roles', rolesRouter);
        this.app.use('/api/password', passwordRouter);  
        this.app.use('/', viewsRouter)
        this.app.use(errorHandler);

    }

    callback() {
        return this.app
    }

    close() {
        this.server.close();
    }

    listen() {
        const server = this.app.listen(8081, () => {
            console.log('Listening on port 8081');
        });

        return server
    }
}

export default AppExpress;


