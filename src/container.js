import dotenv from 'dotenv';
dotenv.config();

import { createContainer, asClass, Lifetime } from 'awilix';
import repositoryRolesMongoose from './data/repositories/roles/repositoryRolesMongoose.js';
import repositoryUserMongoose from './data/repositories/users/repositoryUserMongoose.js';
import repositoryCartMongoose from './data/repositories/carts/repositoryCartMongoose.js';
import repositoryProductMongoose from './data/repositories/products/repositoryProductMongoose.js';
import repositoryTicketsMongoose from './data/repositories/tickets/repositoryTicketsMongoose.js';

const container = createContainer();

container.register('repositoryUser', asClass(repositoryUserMongoose), { lifetime: Lifetime.SINGLETON });
container.register('repositoryProduct', asClass(repositoryProductMongoose), { lifetime: Lifetime.SINGLETON });
container.register('repositoryCart', asClass(repositoryCartMongoose), { lifetime: Lifetime.SINGLETON });
container.register('repositoryRole', asClass(repositoryRolesMongoose), { lifetime: Lifetime.SINGLETON });
container.register('repositoryTickets', asClass(repositoryTicketsMongoose), { lifetime: Lifetime.SINGLETON });

export default container;