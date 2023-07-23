import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const generateToken = async (user) => {
    return jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '5m' })
}

export const createHash = async (password) => {
    return await bcrypt.hash(password, 10);  
}

export const isValidPassword = async (user, password) => {
     return await bcrypt.compare(password, user.password)
}   

