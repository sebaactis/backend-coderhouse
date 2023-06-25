import container from "../../container.js";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD
    }
})

class TicketsManager {

    constructor() {
        this.daoTicket = container.resolve('repositoryTickets');
    }

    async create(purchase, email) {

        const purchaseTotal = purchase.reduce((acumulador, producto) => acumulador + producto.totalPrice, 0)
        const obtenerFechaPersonalizada = () => {
            const fecha = new Date();
            const dia = fecha.getDate();
            const mes = fecha.getMonth() + 1;
            const año = fecha.getFullYear();

            const fechaFormateada = `${dia}/${mes}/${año}`;
            return fechaFormateada;
        }

        const payload = {
            code: uuidv4(),
            created_at: obtenerFechaPersonalizada(),
            amount: purchaseTotal,
            purchaser: email
        }

        const result = await transport.sendMail({
            from: 'Compras Test test@gmail.com',
            to: email,
            subject: 'Su compra se ha realizado con exito!',
            html: `<div>
            <h1>Su compra se ha realizado con exito!</h1>

            <p>Su codigo de compra es: ${payload.code}</p>
            <p>La compra se realizo el: ${payload.created_at}</p>
            <p>El monto final de su compra es: ${payload.amount}</p>

            <p> Muchas gracias!! </p>

            </div>`,
        })

        const ticket = await this.daoTicket.create(payload);
        return ticket;
    }

}

export default TicketsManager