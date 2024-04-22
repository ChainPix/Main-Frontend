/* eslint-disable */
import Image from 'next/image';
import { HiX } from 'react-icons/hi';
import Links from './components/Links';
import WealthOSLogo from '/public/wealthos-logo.png';
import SLFlag from '/public/img/country/sl.png';
import UKFlag from '/public/img/country/uk.png';
import { IRoute } from 'types/navigation';

function SidebarHorizon(props: { routes: IRoute[];[x: string]: any }) {
  const { routes, open, setOpen } = props;
  const { name, role, organization } = document.cookie.split(';').reduce((acc: { [key: string]: string }, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key.trim()] = value;
    return acc;
  }, {});

  return (
    <div className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'}`}>
      <span className="absolute right-4 top-4 block cursor-pointer xl:hidden" onClick={() => setOpen(false)}>
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[10px] mb-[25px] flex items-center`}>
        <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          WealthOS <span className="font-medium">LMS</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image
          className="h-20 w-20 rounded-full"
          src={WealthOSLogo}
          alt="WealthOS Logo"
        />
      </div>
      <div className={`mx-[56px] mb-[20px] flex items-center justify-center`}>
        <div className="ml-1 mt-1 h-2.5 text-[26px] text-navy-700 dark:text-white ">
          <h1>{role}</h1>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <h1>{name}</h1>
      </div>
      <div className="flex items-center justify-center">
        {/* if organization=sl put src as SLFlag else put src as UKFlag */}
        <Image
          className="h-6 w-6"
          src={organization == 'WOSL' ? SLFlag : UKFlag}
          alt="Flag"
        />
      </div>
      <div className="mb-7 mt-[10px] h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Nav item end */}
    </div>
  );
}

export default SidebarHorizon;
