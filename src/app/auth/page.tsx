'use client';

import React from 'react';
import Link from 'next/link';

export default function Authenticate(): React.JSX.Element {
  return (
    <form className="mx-14 -mt-60 rounded-3xl border-2 border-slate-900 bg-white px-5 pb-6 pt-8 shadow-2xl">
      <h2 className="pb-1 pl-5 text-2xl font-medium text-slate-600">
        Welcome{' '}
      </h2>
      <h3 className="pl-5 text-slate-400">
        Haven&apos;t seen this one before did you?
      </h3>

      {/* Action Button Container */}
      <div className="flex w-full  flex-col justify-center gap-5 pt-8 text-2xl font-medium">
        <Link
          href="/auth/sign-in"
          type="submit"
          className="w-full rounded-2xl border-2 border-orange-600 bg-orange-600 py-2 text-white
            transition-all hover:drop-shadow-xl text-center"
        >
          Sign In
        </Link>
        <div className="border bg-slate-700" />
        <Link
          href="/auth/sign-up"
          type="submit"
          className="w-full rounded-2xl border-2 border-orange-600  bg-white py-2 text-orange-600
            transition-all hover:drop-shadow-xl text-center"
        >
          Sign Up
        </Link>
      </div>
      <div className="w-full pl-5 pt-4 text-left font-normal text-slate-500 hover:underline">
        <span>
          <Link href="#">Learn more about us</Link>
        </span>
      </div>
    </form>
  );
}
