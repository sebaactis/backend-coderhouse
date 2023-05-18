import z from 'zod';

const userValidation = z.object({
    firstName: z.string().max(25),
    lastName: z.string().max(25),
    email: z.string().email(),
    age: z.number(),
})

export default userValidation;