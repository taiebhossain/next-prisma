import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const initialPosts: Prisma.PostCreateInput[] = [
  {
    title: 'Post 1',
    content: 'Some description here for post one',
    author: {
      connectOrCreate: {
        where: {
          email: 'hossain@gmail.com',
        },
        create: {
          email: 'hossain@gmail.com',
          hashedPassword: 'aqswdefrgthyjukilo',
        },
      },
    },
  },
  {
    title: 'Post 2',
    content: 'Some description here for post two',
    author: {
      connectOrCreate: {
        where: {
          email: 'alice@gmail.com',
        },
        create: {
          email: 'alice@gmail.com',
          hashedPassword: 'aqswdefrgthyjukilo',
        },
      },
    },
  },
  {
    title: 'Post 3',
    content: 'Some description here for post three',
    author: {
      connectOrCreate: {
        where: {
          email: 'david@gmail.com',
        },
        create: {
          email: 'david@gmail.com',
          hashedPassword: 'aqswdefrgthyjukilo',
        },
      },
    },
  },
];
async function main() {
  console.log('started seeding...');

  for (const post of initialPosts) {
    const newPost = await prisma.post.create({
      data: post,
    });
    console.log(`created post with id: ${newPost.id}`);
  }

  console.log('finished seeding...');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
