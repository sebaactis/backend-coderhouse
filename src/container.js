import dotenv from 'dotenv';
dotenv.config();

import { createContainer, asClass, Lifetime} from 'awilix';
import daoUserMongoose from './data/daos/users/daoUserMongoose.js';
import daoProductMongoose from './data/daos/products/daoProductMongoose.js';
import daoCartMongoose from './data/daos/carts/daoCartMongoose.js';
import daoRolesMongoose from './data/daos/roles/daoRolesMongoose.js';

const container = createContainer();

container.register('UserDao', asClass(daoUserMongoose), {lifetime: Lifetime.SINGLETON});
container.register('ProductDao', asClass(daoProductMongoose), {lifetime: Lifetime.SINGLETON});
container.register('CartDao', asClass(daoCartMongoose), {lifetime: Lifetime.SINGLETON});
container.register('RolesDao', asClass(daoRolesMongoose), {lifetime: Lifetime.SINGLETON});

export default container;