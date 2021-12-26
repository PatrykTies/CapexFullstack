import { validateRoute } from '../../lib/auth';
//  import prisma from '../../lib/prisma';

export default validateRoute(async (req, res, user) => {
  //   TODO: place where we can add more entities to user object
  //   const playlistsCount = await prisma.playlist.count({
  //     where: {
  //       userId: user.id,
  //     },
  //   });

  //   console.log(playlistsCount);
  //    res.json({ ...user, playlistsCount });
  res.json(user);
});
