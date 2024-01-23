'use client';

import React from 'react';
import Link from 'next/link';

export default function Authenticate(): React.JSX.Element {
  return (
    <form
      className="mx-14 -mt-60 rounded-3xl border-2 border-slate-900 bg-white px-5 pb-6 pt-8 shadow-2xl">
      <h2 className="pl-5 pb-1 text-2xl font-medium text-slate-600">Welcome </h2>
      <h3 className="pl-5 text-slate-400">Haven&apos;t seen this one before did you?</h3>

      {/* Action Button Container */}
      <div className="flex flex-col  text-2xl w-full justify-center pt-8 gap-5 font-medium">
        <button type="submit" className="border-2 bg-orange-600 text-white w-full py-2 rounded-2xl border-orange-600
            transition-all hover:drop-shadow-xl"
        >
          Sign Up
        </button>
        <div className="bg-slate-700 border" />
        <button type="submit" className="border-2 text-orange-600 bg-white border-orange-600  w-full py-2 rounded-2xl
            transition-all hover:drop-shadow-xl"
        >
          Sign In
        </button>
      </div>
      <div className="text-left w-full pt-4 font-normal pl-5 text-slate-500 hover:underline">
        <span><Link href="#">Learn more about us</Link></span>
      </div>
    </form>
  );
}
