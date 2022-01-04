import { validateRoute } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

export default validateRoute(async (req, res, user) => {
  const { userid } = req.query;
  const allEntries = await prisma.entries.findMany({
    where: {
      userId: userid,
    },
    include: {
      tasks: true,
    },
  });

  const entries = allEntries || [];

  res.status(200).json({ success: true, data: { ...user, entries } });
});
