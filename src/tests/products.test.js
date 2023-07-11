import dotenv from 'dotenv'
dotenv.config();
import { faker } from '@faker-js/faker';

import chai from 'chai';
import supertest from 'supertest';
import initServer from './index.js';

const expect = chai.expect
let jwt = "";

describe("Testing Products EndPoints Success", () => {

    before(async function () {

        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app
        this.db = db;
        this.id = ""
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

    it("Endpoint getProducts /api/products", function () {

        return this.requester
            .get("/api/products")
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.payload.docs).to.be.an('array');
            }
            )
    })

    it("Endpoint getOneProduct /api/products/pid", function () {

        return this.requester
            .get("/api/products/644a7811ad1ce3a3ac89a9f8")
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.payload).to.be.an('object');
            }
            )
    })

    it("Endpoint create /api/products", function () {

        const payload = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: "GHD500",
            price: 1200,
            status: true,
            stock: 80,
            category: "Otros"
        }

        return this.requester
            .post("/api/products")
            .send(payload)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(201);
                expect(_body.newProduct).to.be.an('object');

                this.id = _body.newProduct.id;
            }
            )
    })

    it("Endpoint update /api/products/pid", function () {

        const payload = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: "GHD500",
            price: 300,
            status: true,
            stock: 20,
            category: "Otros"
        }

        return this.requester
            .put(`/api/products/${this.id}`)
            .send(payload)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.data).to.be.an('object');
            }
            )
    })

    it("Endpoint delete /api/products/pid", function () {

        return this.requester
            .delete(`/api/products/${this.id}`)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.message).to.be.equals(`product ${this.id} has been deleted`);
            }
            )
    })

})

describe("Testing Products EndPoints Failed", () => {

    before(async function () {

        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app
        this.db = db;
        this.id = ""
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

    it("Endpoint create /api/products", function () {

        const payload = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: 505,
            price: 1200,
            status: true,
            stock: 80,
            category: "Otros"
        }

        return this.requester
            .post("/api/products")
            .send(payload)
            .then(result => {
                const { status } = result;

                expect(status).to.be.equals(400);
            }
            )
    })

})