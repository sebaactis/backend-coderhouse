import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products';

const productSchema = new mongoose.Schema({
    title: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    code: { type: Schema.Types.String, required: true },
    price: { type: Schema.Types.Number, required: true },
    status: { type: Schema.Types.Boolean, required: true },
    stock: { type: Schema.Types.Number, required: true },
    category: { type: Schema.Types.String, required: true },
    thumbnail: { type: Schema.Types.String },
})

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model(productsCollection, productSchema);

