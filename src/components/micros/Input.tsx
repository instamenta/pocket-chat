'use client';

import React, { ChangeEvent, useState } from 'react';

type props = {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  pattern?: string | undefined;
  minLength?: number;
};

export default function Input({
  name,
  placeholder,
  pattern,
  minLength,
  type = 'text',
  required = false,
}: props) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isUnfocused, setIsUnfocused] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    setIsTouched(true);

    const isValidPattern = !pattern || new RegExp(pattern).test(input.value);
    const isValidMinLength = !minLength || input.value.length >= minLength;
    const isValidInput = isValidPattern && isValidMinLength;

    if (isValidInput) {
      setIsValid(true);
      setErrorMessage('');
    } else {
      setIsValid(false);
      setErrorMessage(input.validationMessage);
    }
  };

  return (
    <div key={name}>
      <input
        name={name}
        type={type}
        minLength={minLength}
        required={required}
        placeholder={placeholder}
        className={`my-2 w-full rounded-md border-2 px-4 py-2 outline-none transition-all hover:border-slate-300 ${
          isTouched && isUnfocused
            ? isValid !== null &&
              (isValid
                ? 'border-green-400 focus:border-green-600'
                : 'border-red-500 focus:border-red-300')
            : 'border-blue-400'
        }`}
        onChange={handleChange}
        onFocus={() => setIsUnfocused(false)}
        onBlur={(event) => {
          handleChange(event);
          setIsUnfocused(true);
        }}
      />
      <span
        className={`transition-colors ${
          isTouched && isUnfocused
            ? isValid !== null && (isValid ? 'text-blue-400' : 'text-red-500')
            : 'text-gray-500'
        }`}
      >
        {isTouched ? isValid !== null && (isValid ? '' : errorMessage) : ''}
      </span>
    </div>
  );
}
