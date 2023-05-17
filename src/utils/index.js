import jwt from 'jsonwebtoken';

export const generateToken = async (user) => {
    return jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '1m' })
}