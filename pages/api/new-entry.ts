import { NextApiRequest, NextApiResponse } from 'next';
import { validateRoute } from '../../lib/auth';
import prisma from '../../lib/prisma';

export default validateRoute(async (req: NextApiRequest, res: NextApiResponse, user) => {
  const { dateOfEntry, totalHrs, tasks } = req.body;

  try {
    await prisma.entries.create({
      data: {
        dateOfEntry,
        totalHrs,
        user: {
          connect: { id: user.id },
        },
        tasks: {
          connect: tasks.map((task) => ({ id: task.id })),
        },
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: 'User already exists.' });
    return;
  }

  res.status(200).json({ success: true, data: [] });
});
