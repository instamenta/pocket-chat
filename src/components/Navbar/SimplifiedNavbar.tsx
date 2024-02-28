import React from 'react';
import { Link } from 'lucide-react';
import { BsChevronLeft } from 'react-icons/bs';
import { GoGear } from 'react-icons/go';

const SimplifiedNavbar = ({title}: {title?: string}) => {
  return (
    <nav className="flex justify-between px-3 pt-3 w-full">
      <Link
        className="flex justify-center align-middle"
        href='/feed'
      >
        <BsChevronLeft className="h-6 w-6" />
      </Link>

      <div className="m-auto w-full text-center">
        <h1 className="select-none pb-5 text-xl font-medium">{title ?? ''}</h1>
      </div>
      <button className="flex justify-center align-middle">
        <GoGear className="h-7 w-7" />
      </button>
    </nav>
  );
};

export default SimplifiedNavbar;