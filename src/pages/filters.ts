

const users = await prisma.user.findMany({
  where: {
    email: {
      endsWith: 'prisma.io',
      mode: 'insensitive', // Default value: default
    },
    name: {
      equals: 'Archibald', // Default mode
    },
  },
})

const usersWithPosts = await prisma.user.findMany({
  orderBy: [
    {
      role: 'desc',
    },
    {
      name: 'desc',
    },
  ],
  include: {
    posts: {
      orderBy: {
        title: 'desc',
      },
      select: {
        title: true,
      },
    },
  },


  const getActiveUsers = await prisma.user.findMany({
    take: 10,
    orderBy: {
      posts: {
        _count: 'desc',
      },
    },
  })