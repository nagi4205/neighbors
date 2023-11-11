import React from 'react';

function page({ params }: { params: { username: any; id: any } }) {
  if (params.username & params.id) {
    console.log('username');
  }
  if (!params.id || !params.username) return null;
  return (
    <>
      <div>{params.username}</div>
      <div>{params.id}</div>
    </>
  );
}

export default page;
