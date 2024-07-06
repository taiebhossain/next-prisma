'use server';

import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createNewPost(formdata: FormData) {
  const useremail = 'boby@gmail.com';

  try {
    await prisma.post.create({
      data: {
        title: formdata.get('title') as string,
        content: formdata.get('content') as string,
        author: {
          connect: { email: useremail },
        },
      },
    });
    // console.log(newpost);
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
