import React from 'react';

const UserTestimonial = () => {
  return (
    <figure className="mx-auto max-w-screen-md text-center border-y py-8">
      <svg
        className="mx-auto mb-3 h-10 w-10 text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 14"
      >
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
      </svg>
      <blockquote>
        <p className="text-2xl font-medium italic text-gray-900">
          &quot;Pocket Chat is just awesome. I must admin at facebook we dont wanna compete with them.&quot;
        </p>
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-center space-x-3 rtl:space-x-reverse">
        <img
          className="size-7 rounded-full"
          src="https://pyxis.nymag.com/v1/imgs/8ca/b75/c196b6f34c272c34653b0fbeba888abd35-zuckerberg.rsquare.w400.jpg"
          alt="profile picture"
        />
        <div className="flex items-center divide-x-2 divide-gray-500 rtl:divide-x-reverse ">
          <cite className="pe-3 font-medium text-gray-900">Mark Zuckerberg</cite>
          <cite className="text-gray-5000 ps-3 text-sm">CEO of Facebook</cite>
        </div>
      </figcaption>
    </figure>
  );
};

export default UserTestimonial;
