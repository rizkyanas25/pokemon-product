import { PokeLogo } from '../../assets/Images';

function Sidebar() {
  return (
    <div className='w-60 h-screen flex flex-col items-center justify-start bg-gray-200 p-7'>
      <img src={PokeLogo} alt='PokeSell Logo' />
      <div className='flex flex-col gap-4 items-center mt-20'>
        <div className={`text-lg hover-opacity`}>Dashboard</div>
        <div className={`text-lg hover-opacity`}>Products</div>
      </div>
    </div>
  );
}

export default Sidebar;
