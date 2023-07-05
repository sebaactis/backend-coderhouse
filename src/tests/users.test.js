import dotenv from 'dotenv'
dotenv.config();
import { faker } from '@faker-js/faker';

import chai from 'chai';
import supertest from 'supertest';
import initServer from './index.js';

const expect = chai.expect
let jwt = "";

describe("Testing Users EndPoints Success", () => {

    before(async function () {

        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app
        this.db = db;
        this.payload = "";
    });

    after(async function () {
        this.db.drop();
        this.db.close();
        this.requester.app.close(() => {
            console.log('Conexión cerrada');
        });
    })

    beforeEach(async function () {
        this.timeout(3000);
        await new Promise(resolve => setTimeout(resolve, 1000))
    });

    it("Login de cuenta /api/sessions/login para autorizar en users", function () {

        const payload = {
            email: "sebaactis@gmail.com",
            password: "54891329"
        };

        return this.requester
            .post("/api/session/login")
            .send(payload)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.message).to.be.equals("Login success!")

                jwt = _body.accessToken;

            })
    })

    it("Endpoint getUsers /api/users", function () {

        const payload = {
            email: "sebaactis@gmail.com",
            password: "54891329"
        }

        return this.requester
            .get("/api/users")
            .send(payload)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.payload.users).to.be.an('array');
            }
            )
    })

    it("Endpoint addUser /api/user", function () {

        this.payload = {
            firstName: `${faker.person.firstName()}`,
            lastName: `${faker.person.lastName()}`,
            email: faker.internet.email(),
            age: 20,
            password: "12345678"
        }

        return this.requester
            .post("/api/users")
            .send(this.payload)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200)
                expect(_body.payload.email).to.be.equals(this.payload.email)
            }
            )
    })

    it("Endpoint getUser /api/users/email", function () {

        const payload = {
            email: "sebaactis@gmail.com"
        }

        return this.requester
            .get(`/api/users/${payload.email}`)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200)
                expect(_body.payload.email).to.be.equals(payload.email)
            }
            )
    })

    it("Endpoint Update /api/users/email", function () {

        const payload = {
            age: 70
        }

        return this.requester
            .put(`/api/users/${this.payload.email}`)
            .send(payload)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200)
                expect(_body.payload.age).to.be.equals(payload.age)
            }
            )
    })

    it("Endpoint Delete /api/users/email", function () {

        return this.requester
            .delete(`/api/users/${this.payload.email}`)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200)
                expect(_body.message).to.be.equals("User deleted")
            }
            )
    })

})

