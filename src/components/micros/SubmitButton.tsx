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
        className={`m-auto border-4 border-orange-600 bg-orange-600 text-white 
        rounded-xl w-1/2 text-2xl font-medium transition-all
        hover:bg-white hover:text-black hover:scale-110  disabled:bg-gray-600 
         ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Sign In
      </button>
    </div>
  );
}