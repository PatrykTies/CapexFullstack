import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { validateRoute } from '../../lib/auth';

export default validateRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  const getAllTasks = await prisma.task.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const createTaskGetUpdated = async ({ name, duration, url }) => {
    await prisma.task.upsert({
      where: { name },
      update: {},
      create: {
        name,
        duration,
        url,
      },
    });

    const updatedTasks = await prisma.task.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return updatedTasks;
  };

  switch (req.method) {
    case 'GET':
      return res.status(200).json({ success: true, data: getAllTasks });
    case 'POST': {
      const updatedTasks = await createTaskGetUpdated(req.body);
      return res.status(200).json({ success: true, data: updatedTasks });
    }
    default:
      return res.status(405).end({ success: false, error: `Method ${req.method} Not Allowed` });
  }
});
