import prisma from '@/lib/db';

export default async function PostdetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  return (
    <div className='flex flex-col items-center p-20'>
      <div className='rounded p-8'>
        <h2 className='font-bold text-3xl mb-5'>{post?.title}</h2>
        <p>{post?.desc}</p>
      </div>
    </div>
  );
}
