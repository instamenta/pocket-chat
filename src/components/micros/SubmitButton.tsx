'use client';

import { useFormStatus } from 'react-dom';
import React from 'react';

export default function SubmitButton(): React.JSX.Element {
  const { pending } = useFormStatus();

  return (
    <div className="flex w-full justify-center pt-4">
      <button
        type="submit"
        aria-disabled={pending}
        className={`m-auto w-1/2 rounded-xl border-4 border-orange-600 
        bg-orange-600 text-2xl font-medium text-white transition-all
        hover:scale-110 hover:bg-white hover:text-black  disabled:bg-gray-600 
         ${pending ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        Sign In
      </button>
    </div>
  );
}
