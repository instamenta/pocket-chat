'use client';

import React from 'react';
import { action_handleSignUp } from '@/lib/actions/authentication';
import Input from '@/components/micros/Input';
import SubmitButton from '@/components/micros/SubmitButton';
import { useFormState } from 'react-dom';
import Link from 'next/link';

export default function SignUp() {
  const [state, action] = useFormState(action_handleSignUp, { message: '' });

  return (
    <form
      className="mx-14 -mt-60 rounded-3xl border-2 border-slate-900 bg-white px-5 pb-12 pt-8 shadow-2xl"
      action={action}
    >
      {/* Info */}
      <h2 className="pb-3 text-3xl text-slate-600">Register </h2>
      <h3 className="text-slate-400 mb-4">Connect with the people you like.</h3>

      {/* Input Fields */}
      <Input
        required
        type="text"
        minLength={3}
        name="firstName"
        placeholder="First name"
        pattern="^(?![-_.])[a-zA-Z0-9]+(?:[-_.][a-zA-Z0-9]+)*$(?<![-_.])"
      />
      <Input
        required
        type="text"
        minLength={3}
        name="lastName"
        placeholder="Last name"
        pattern="^(?![-_.])[a-zA-Z0-9]+(?:[-_.][a-zA-Z0-9]+)*$(?<![-_.])"
      />
      <Input
        required
        type="text"
        minLength={3}
        name="username"
        placeholder="Username"
        pattern="^(?![-_.])[a-zA-Z0-9]+(?:[-_.][a-zA-Z0-9]+)*$(?<![-_.])"
      />
      <Input
        required
        type="email"
        name="email"
        placeholder="Email"
        pattern={'^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'}
      />
      <Input
        required
        minLength={8}
        type="password"
        name="password"
        placeholder="Password"
      />
      <Input
        required
        minLength={8}
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
      />

      {/* Form Messages */}
      <span className="text-red-600 text-md">{state?.message}</span>

      {/* Action Button Container */}
      <SubmitButton />

      {/* Redirect Link */}
      <div className="w-full flex justify-center pt-4">
        <Link
          className="text-amber-800 hover:underline hover:text-purple-800"
          href="/auth/sign-in"
        >
          Already have an account?
        </Link>
      </div>

    </form>
  );
}
