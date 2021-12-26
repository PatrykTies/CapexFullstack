import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '../../lib/prisma';

 export default async (req: NextApiRequest,res: NextApiResponse) => {
    const {email, password} = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if(user && bcrypt.compareSync(password, user.password)){
        const token = jwt.sign({
            email: user.email,
            id: user.id,
            time: Date.now(),
        }, 'secretkey', {expiresIn: '8h'});

        res.setHeader(
            'Set-Cookie',
            cookie.serialize('JWT_AUTH', token, {
                httpOnly: true, // cant access cookie via client javascript
                maxAge: 8 * 60 * 60,
                path:'/',//what route has access to this cookie - here whole site
                sameSite: 'lax',//should share cookie to third party, "strict" would not allow
                secure: process.env.NODE_ENV === 'production'// should be encrypted only in prod
            })
        )
    }else{
        res.status(401).json({error: 'Email or password is wrong. Try again.'})
    }
 }