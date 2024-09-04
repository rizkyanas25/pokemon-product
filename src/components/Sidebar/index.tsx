import React from 'react';

function Sidebar() {
  return (
    <div className='w-60 h-screen flex flex-col items-center justify-start bg-blue-200 p-7'>
      <h1 className='text-2xl'>PokeSell</h1>
      <div className='flex flex-col gap-4 items-center mt-20'>
        <div className={`text-lg hover-opacity`}>Dashboard</div>
        <div className={`text-lg hover-opacity`}>Products</div>
      </div>
    </div>
  );
}

export default Sidebar;
