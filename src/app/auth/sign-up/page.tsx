'use client';

import React from 'react';
import { REST } from '@/variables';

interface I_FormState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// TODO: JUMP BETWEEN SIGN IN AND SIGN UP FROM FORM AND ADD <--- BUTTON

export default function SignUp(): React.JSX.Element {
  const [acceptedTerms, setAcceptedTerms] = React.useState<boolean>(false);

  const [validationErrors, setValidationErrors] = React.useState<
    Partial<I_FormState>
  >({});

  const [formState, setFormState] = React.useState<I_FormState>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  type T_InputFields = Array<{
    name: keyof I_FormState;
    placeholder: string;
    type?: string;
  }>;

  const inputFields: T_InputFields = [
    { name: 'firstName', placeholder: 'First name' },
    { name: 'lastName', placeholder: 'Last name' },
    { name: 'username', placeholder: 'Username' },
    { name: 'email', placeholder: 'Email', type: 'email' },
    { name: 'password', placeholder: 'Password', type: 'password' },
    {
      name: 'confirmPassword',
      placeholder: 'Confirm Password',
      type: 'password'
    }
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

    // Validation logic for each field...
    switch (fieldName) {
      case 'firstName':
        formState.firstName.length < 3 || formState.firstName.length > 32
          ? setValidationErrors((prevErrors) => ({
            ...prevErrors,
            firstName: 'First name must be between 3 and 32 characters'
          }))
          : setValidationErrors((prevErrors) => ({
            ...prevErrors,
            firstName: undefined
          }));
        break;
      case 'lastName':
        formState.lastName.length < 3 || formState.lastName.length > 32
          ? setValidationErrors((prevErrors) => ({
            ...prevErrors,
            lastName: 'Last name must be between 3 and 32 characters'
          }))
          : setValidationErrors((prevErrors) => ({
            ...prevErrors,
            lastName: undefined
          }));
        break;
      case 'username':
        formState.username.length < 3 || formState.username.length > 32
          ? setValidationErrors((prevErrors) => ({
            ...prevErrors,
            username: 'Username must be between 3 and 32 characters'
          }))
          : setValidationErrors((prevErrors) => ({
            ...prevErrors,
            username: undefined
          }));
        break;
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
      case 'confirmPassword':
        formState.password !== formState.confirmPassword
          ? setValidationErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: 'Passwords do not match'
          }))
          : setValidationErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: undefined
          }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('IN');

    if (!validateForm()) {
      console.log('Invalid form:', formState);
      return;
    }

    const { username, password, email, lastName, firstName } = formState;

    let init: RequestInit = {};
    try {
      init = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, lastName, firstName }) as BodyInit
      };
    } catch (error) {
      return console.error('Failed to JSON stringify body, Error:', error);
    }

    console.log(init);

    try {
      const response = await fetch(REST.SIGN_UP, init);

      if (!response.ok) return console.error(`HTTP error! Status: ${response.status}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const validateForm = () => {
    const errors: Partial<I_FormState> & { termsAndConditions?: string } = {};

    // First Name
    if (formState.firstName.trim() === '') {
      errors.firstName = 'First name is required';
    } else if (
      formState.firstName.length < 3 ||
      formState.firstName.length > 32
    ) {
      errors.firstName = 'First name must be between 3 and 32 characters';
    }

    // Last Name
    if (formState.lastName.trim() === '')
      errors.lastName = 'Last name is required';
    else if (formState.lastName.length < 3 || formState.lastName.length > 32) {
      errors.lastName = 'Last name must be between 3 and 32 characters';
    }

    // Username
    if (formState.username.trim() === '') {
      errors.username = 'Username is required';
    } else if (
      formState.username.length < 3 ||
      formState.username.length > 32
    ) {
      errors.username = 'Username must be between 3 and 32 characters';
    }

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

    // Confirm Password
    if (formState.confirmPassword.trim() === '') {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (formState.password !== formState.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Terms and Conditions
    if (!acceptedTerms) {
      errors.termsAndConditions = 'You must accept the Terms and Conditions';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <form
      className="mx-14 -mt-60 rounded-3xl border-2 border-slate-900 bg-white px-5 pb-12 pt-8 shadow-2xl"
      onSubmit={handleSubmit}
    >
      <h2 className="pb-3 text-3xl text-slate-600">Register </h2>
      <h3 className="text-slate-400">Connect with the people you like.</h3>
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
              validationErrors[field.name] ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors[field.name] && (
            <p className="mt-1 text-xs text-red-500">{validationErrors[field.name]}</p>
          )}
        </div>
      ))}

      {/* Terms and Conditions Checkbox */}
      <div className="my-2 flex items-center">
        <input
          type="checkbox"
          name="termsAndConditions"
          checked={acceptedTerms}
          onChange={(event) => setAcceptedTerms(event.target.checked)}
          className="mx-4"
        />
        <label className="font-light text-slate-600 hover:underline">Terms and Conditions</label>
      </div>

      {/* Action Button Container */}
      <div className="flex w-full justify-center pt-4">
        <button
          type="submit"
          className="border-2 bg-white px-12 py-1 text-xl text-gray-800
          shadow-inner shadow-gray-500 transition-all hover:border-slate-400 hover:bg-slate-100"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
