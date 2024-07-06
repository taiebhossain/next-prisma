'use server';

import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createNewPost(formdata: FormData) {
  const useremail = 'boby@gmail.com';

  const postData = {
    title: formdata.get('title') as string,
    content: formdata.get('content') as string,
  };

  if (typeof title !== 'string' || typeof content !== 'string') {
    throw new Error('Form data is not valid.');
  }
  console.log(postData);
  try {
    const newpost = await prisma.post.create({
      data: {
        ...postData,
        author: {
          connectOrCreate: {
            where: { email: useremail },
            create: {
              email: useremail,
              hashedPassword: 'qqqueuueijjdhdfjjffj',
            },
          },
        },
      },
      include: {
        author: true,
      },
    });
    console.log(newpost);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email',
        );
      }
    }
  }

  revalidatePath('/posts');
}
