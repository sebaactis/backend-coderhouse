import dotenv from 'dotenv'
dotenv.config();
import { faker } from '@faker-js/faker';

import chai from 'chai';
import supertest from 'supertest';
import initServer from './index.js';

const expect = chai.expect
let jwt = "";

describe("Testing Session EndPoints Success", () => {

    before(async function () {

        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app
        this.db = db;
        this.payload = {};
    });

    after(async function () {
        this.db.drop();
        this.db.close();
        this.requester.app.close(() => {
            console.log('Conexión cerrada');
        });
    })

    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500))
    });

    it("Creacion de cuenta en http://localhost:8081/api/session/signup", function () {

        this.payload = {
            firstName: `${faker.person.firstName()}`,
            lastName: `${faker.person.lastName()}`,
            email: faker.internet.email(),
            age: 20,
            password: "12345678"
        };

        return this.requester
            .post("/api/session/signup")
            .send(this.payload)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(201);
                expect(_body.user.firstName).to.be.equals(this.payload.firstName)
                expect(_body.message).to.be.equals("User added successfully")
            }
            )
    })

    it("Login de cuenta /api/sessions/login", function () {

        const payload = {
            email: this.payload.email,
            password: this.payload.password
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


    it('Current /api/sessions/current', function () {

        const payload = {
            email: this.payload.email,
            password: this.payload.password
        };

        return this.requester
            .get('/api/session/current')
            .set('Authorization', `Bearer ${jwt}`)
            .send(payload)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.payload.email).to.be.equals(this.payload.email);
            })
    })

})


