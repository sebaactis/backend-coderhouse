import mongoose, { Schema } from "mongoose";

const ticketsCollection = 'tickets';

const TicketsSchema = new Schema({
    id: { type: Schema.Types.ObjectId },
    code: { type: Schema.Types.String, required: true, unique: true },
    created_at: { type: Schema.Types.String, required: true },
    amount: { type: Schema.Types.Number, required: true },
    purchaser: { type: Schema.Types.String, required: true }
});

export const TicketsModel = mongoose.model(ticketsCollection, TicketsSchema);