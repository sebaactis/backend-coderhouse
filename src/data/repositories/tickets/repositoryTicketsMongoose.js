import Ticket from "../../../domain/entities/ticket.js";
import { TicketsModel } from "../../models/tickets.model.js";

class repositoryTicketsMongoose {
    async create(payload) {

        console.log(payload);

        const ticket = await TicketsModel.create(payload)

        return new Ticket({
            id: ticket._id,
            code: ticket.code,
            created_at: ticket.created_at,
            amount: ticket.amount,
            pursacher: ticket.pursacher
        })
    }
}

export default repositoryTicketsMongoose;