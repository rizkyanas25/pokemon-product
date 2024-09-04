import { FaUser } from 'react-icons/fa6';

function Sidebar() {
  return (
    <div className='w-full h-20 flex items-center justify-end bg-gray-100 p-7'>
      <div className='bg-blue-100 rounded-full p-4 hover-opacity'>
        <FaUser />
      </div>
    </div>
  );
}

export default Sidebar;
