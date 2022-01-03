import jwt from 'jsonwebtoken';
import prisma from './prisma';

// middleware
export const validateRoute = (handler) => {
  return async (req, res) => {
    const token = req.cookies.JWT_AUTH || req.headers['auth-token'];

    if (token) {
      let user;
      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error('User not found.');
        }
      } catch (e) {
        res.status(401).json({ success: false, error: e.message || 'Not Authorized' });
        return;
      }

      return handler(req, res, { ...user, token });
    }

    res.status(401).json({ success: false, error: 'Not Authorized' });
  };
};
