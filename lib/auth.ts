import jwt from 'jsonwebtoken';
import prisma from './prisma';

// middleware
export const validateRoute = (handler) => {
  return async (req, res) => {
    const token = req.cookies.JWT_AUTH;

    if (token) {
      let user;
      try {
        const { id } = jwt.verify(token, 'secretkey');
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error('User not found.');
        }
      } catch (e) {
        res.status(401).json({ error: 'Not Authorized' });
        return;
      }

      return handler(req, res, user);
    }

    res.status(401).json({ error: 'Not Authorized' });
  };
};
