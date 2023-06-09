import z from 'zod';

const productValidation = z.object({
    title: z.string(),
    description: z.string(),
    code: z.string(),
    price: z.number(),
    status: z.boolean(),
    stock: z.number(),
    category: z.string()
})

export default productValidation;