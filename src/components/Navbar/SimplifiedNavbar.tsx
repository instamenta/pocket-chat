import React from 'react';
import { GoChevronLeft, GoGear } from 'react-icons/go';
import Link from 'next/link';

const SimplifiedNavbar = ({ title }: { title?: string }) => {
  return (
    <nav className="flex w-full justify-between px-3 pt-3">
      <Link className="flex justify-center align-middle text-transparent" href="/feed">
        <GoChevronLeft className="size-8 fill-white scale-150" />
      </Link>

      <div className="m-auto w-full text-center">
        <h1 className="select-none pb-5 text-xl font-medium">{title ?? ''}</h1>
      </div>
      <button className="flex justify-center align-middle">
        <GoGear className="size-6 fill-white" />
      </button>
    </nav>
  );
};

export default SimplifiedNavbar;
