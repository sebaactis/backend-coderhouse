import z from 'zod';

const mailValidation = z.object({
    email: z.string().email()
})

export default mailValidation;