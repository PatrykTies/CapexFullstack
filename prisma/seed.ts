import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { artistsData } from './songsData';
import { entriesData } from './entriesData';
import { tasksData } from './tasksData';

const prisma = new PrismaClient();

const run = async () => {
  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      password: bcrypt.hashSync('password', salt),
      firstName: 'patryk',
      lastName: 'ties',
    },
  });

  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    })
  );

  await Promise.all(
    tasksData.map(async (task) => {
      return prisma.task.upsert({
        where: { name: task.name },
        update: {},
        create: {
          name: task.name,
          duration: task.duration,
          url: task.url,
        },
      });
    })
  );

  const songs = await prisma.song.findMany({});
  await Promise.all(
    new Array(10).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist no${i + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
        },
      });
    })
  );

  const tasks = await prisma.task.findMany({});
  await Promise.all(
    entriesData.map(async (entry) => {
      return prisma.entries.create({
        data: {
          dateOfEntry: entry.dateOfEntry,
          totalHrs: entry.totalHrs,
          user: {
            connect: { id: user.id },
          },
          tasks: {
            connect: entry.tasks.reduce((acc, task) => {
              const item = tasks.find((entryTask) => task.name === entryTask.name);
              if (item !== undefined) return [...acc, { id: item.id }];
              return acc;
            }, []),
          },
        },
      });
    })
  );
};

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
