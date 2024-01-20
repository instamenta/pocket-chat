'use client';

import React from 'react';

interface I_FormState {
  email: string;
  password: string;
}

export default function SignIn(): React.JSX.Element {
  const [validationErrors, setValidationErrors] = React.useState<
    Partial<I_FormState>
  >({});

  const [formState, setFormState] = React.useState<I_FormState>({
    email: '',
    password: ''
  });

  type T_InputFields = Array<{
    name: keyof I_FormState;
    placeholder: string;
    type?: string;
  }>;

  const inputFields: T_InputFields = [
    { name: 'email', placeholder: 'Email', type: 'email' },
    { name: 'password', placeholder: 'Password', type: 'password' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleBlur = (fieldName: keyof I_FormState) => {
    if (formState[fieldName].trim() === '') {
      return setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: undefined
      }));
    }

    switch (fieldName) {
      case 'email':
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)
          ? setValidationErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Invalid email address'
          }))
          : setValidationErrors((prevErrors) => ({
            ...prevErrors,
            email: undefined
          }));
        break;
      case 'password':
        formState.password.length < 8
          ? setValidationErrors((prevErrors) => ({
            ...prevErrors,
            password: 'Password must be at least 8 characters'
          }))
          : setValidationErrors((prevErrors) => ({
            ...prevErrors,
            password: undefined
          }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) console.log('Form submitted:', formState);
    
  };

  const validateForm = () => {
    const errors: Partial<I_FormState> & { termsAndConditions?: string } = {};

    // Email
    if (formState.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = 'Invalid email address';
    }

    // Password
    if (formState.password.trim() === '') {
      errors.password = 'Password is required';
    } else if (formState.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <form
      className="mx-14 -mt-60 rounded-3xl border-2 border-slate-900 bg-white px-5 pb-12 pt-8 shadow-2xl"
      onSubmit={handleSubmit}
    >
      <h2 className="pb-3 text-3xl text-slate-600">Sign In</h2>
      <h3 className="text-slate-400">Welcome back .</h3>
      {/* Input Fields */}
      {inputFields.map((field) => (
        <div key={field.name}>
          <input
            type={field.type || 'text'}
            placeholder={field.placeholder}
            name={field.name}
            value={formState[field.name]}
            onChange={handleChange}
            onBlur={() => handleBlur(field.name)}
            className={`my-2 w-full rounded-md border-2 px-4 py-2 outline-none ${
              validationErrors[field.name]
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {validationErrors[field.name] && (
            <p className="mt-1 text-xs text-red-500">
              {validationErrors[field.name]}
            </p>
          )}
        </div>
      ))}

      {/* Action Button Container */}
      <div className="flex w-full justify-center pt-4">
        <button
          type="submit"
          className="border-2 bg-white px-12 py-1 text-xl text-gray-800
          shadow-inner shadow-gray-500 transition-all hover:border-slate-400 hover:bg-slate-100"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
