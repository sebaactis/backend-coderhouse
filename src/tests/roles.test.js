import dotenv from 'dotenv'
dotenv.config();
import { faker } from '@faker-js/faker';

import chai from 'chai';
import supertest from 'supertest';
import initServer from './index.js';

const expect = chai.expect
let jwt = "";

describe("Testing Rols EndPoints Success", () => {

    before(async function () {

        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app
        this.db = db;
        this.id = "";
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

    it("Login de cuenta /api/sessions/login para autorizar en roles", function () {

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

    it("Endpoint getRoles /api/roles", function () {

        const payload = {
            email: "sebaactis@gmail.com",
            password: "54891329"
        }

        return this.requester
            .get("/api/roles")
            .send(payload)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.roles).to.be.an('object');
            }
            )
    })

    it("Endpoint Create /api/roles", function () {

        const payload = {
            name: "moderator",
        }

        return this.requester
            .post("/api/roles")
            .send(payload)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(201)
                expect(_body.payload.name).to.be.equals(payload.name);
                this.id = _body.payload.id;
            }
            )
    })

    it("Endpoint getOne /api/roles/pid", function () {

        const payload = {
            id: "64775b936c021a596c3ceafa"
        }

        return this.requester
            .get("/api/roles/64775b936c021a596c3ceafa")
            .send(payload)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.id).to.be.equals(payload.id);
            }
            )
    })

    it("Endpoint Update /api/roles/pid", function () {

        const payload = {
            name: "Moderator edit"
        }

        return this.requester
            .put(`/api/roles/${this.id}`)
            .send(payload)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200)
                expect(_body.payload).to.be.equals("Role updated")
            }
            )
    })

    it("Endpoint Update /api/roles/pid", function () {

        return this.requester
            .delete(`/api/roles/${this.id}`)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200)
                expect(_body.payload).to.be.equals("Role deleted")
            }
            )
    })

})


