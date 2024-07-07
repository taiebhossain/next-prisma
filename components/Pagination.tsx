'use client';

import { useRouter } from 'next/navigation';

interface PaginationProps {
  page: number;
}

export default function Pagination({ page }: PaginationProps) {
  const router = useRouter();
  return (
    <div className='flex gap-36 mt-10'>
      <button
        onClick={() => router.push(`?page=${page - 1}`)}
        className='py-2 px-4 border rounded'
      >
        Previous
      </button>
      <button
        onClick={() => router.push(`?page=${page + 1}`)}
        className='py-2 px-4 border rounded'
      >
        Next
      </button>
    </div>
  );
}
