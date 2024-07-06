import Pagination from '@/components/Pagination';
import prisma from '@/lib/db';
import Link from 'next/link';
import { createNewPost } from '../actions';

export default async function PostsListPage() {
  const posts = await prisma.post.findMany();

  return (
    <div className='flex justify-evenly items-center gap-5 p-20'>
      <div>
        <h2 className='text-4xl font-bold'>All Posts </h2>
        <div className='flex flex-col items-start p-5 gap-10'>
          {posts?.map((item, index) => (
            <Link key={item.id} href={`/posts/${item.id}`}>
              {index + 1}. <span>{item.title}</span>
            </Link>
          ))}
        </div>
        <Pagination page='1' />
      </div>
      <div className=''>
        <h2 className='text-2xl font-bold mb-5'>Create new post</h2>
        <form action={createNewPost} className='flex flex-col gap-5'>
          <input
            type='text'
            name='title'
            placeholder='Title'
            className='rounded text-black p-3'
          />
          <textarea
            name='content'
            rows={5}
            cols={30}
            placeholder='Content'
            className='rounded text-black p-3'
          />
          <button type='submit' className='rounded p-3 bg-blue-600/75'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
