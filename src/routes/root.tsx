import { Outlet } from 'react-router-dom';
import { Sidebar, Header } from '../components';

function Root() {
  return (
    <>
      <div className='w-screen h-screen flex'>
        <Sidebar />
        <div className='w-full flex flex-col h-screen'>
          <Header />
          <div id='detail' className='w-full h-full p-7 flex flex-grow'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Root;
