import { Request, Response } from 'express';
import { getUser } from '../models/auth.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// LOGIN
const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await getUser(username);
    if (!user) {
        return res.status(404).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.cookie('token', token, {
        // httpOnly: true,  
        // secure: process.env.NODE_ENV =s== 'production',  // Ensures the cookie is sent over HTTPS in production
        maxAge: 3600000,
        sameSite: 'strict'
    });
    res.status(200).json({ user: user });
}

// LOGOUT
const logout = async (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
}



export default { login, logout };