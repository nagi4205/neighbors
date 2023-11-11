'use client';
import React from 'react';

function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;
  return (
    <>
      <div className='w-full min-h-screen bg-green-400'>inline</div>
    </>
  );
}

export default page;
