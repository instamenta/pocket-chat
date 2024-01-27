'use client';

import React from 'react';

type props = {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  pattern?: string | undefined,
  minLength?: number
};

// Input.tsx (Client-Side)

export default function Input({
                                name,
                                placeholder,
                                pattern,
                                minLength,
                                type = 'text',
                                required = false
                              }: props): React.JSX.Element {
  const [isValid, setIsValid] = React.useState<boolean | null>(null);
  const [isTouched, setIsTouched] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        className={`my-2 w-full rounded-md border-2 px-4 py-2 outline-none transition-all ${
          isTouched
            ? isValid !== null && (isValid ? 'border-blue-400' : 'border-red-500')
            : 'border-gray-300'
        }`}
        onChange={handleChange}
        onBlur={() => setIsTouched(true)}
      />
      <span className={`transition-colors   ${
        isTouched
          ? isValid !== null && (isValid ? 'text-blue-400' : 'text-red-500')
          : 'text-gray-500'
      }`}>
        {isTouched ? (isValid !== null && (isValid ? '' : errorMessage)) : ''}
      </span>
    </div>
  );
}
