import React from 'react';

const LeftImageWithCta = () => {
  return (
    <section className="bg-white mt-10">
      <div className="mx-auto max-w-screen-xl items-center gap-8 px-4 py-8 sm:py-16 md:grid md:grid-cols-2 lg:px-6 xl:gap-16">
        <img
          className="w-full drop-shadow-2xl"
          // src="https://cdn.dribbble.com/users/743744/screenshots/15478451/media/5375b45f393b2b100cff363c72f6bfe1.png"
          src="https://dwglogo.com/wp-content/uploads/2017/08/muscles-clipart-ghoper.gif"
          alt="dashboard image"
        />
        <div className="mt-4 md:mt-0">
          <div className="my-custom-section">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">
              Bringing People Together.
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg">
              <mark className='bg-slate-200'>Discover</mark> and <b>connect</b> with friends and communities who share your interests on Pocket Chat. With
              easy-to-use features like Groups, you can stay in touch, share, and explore communities in a secure
              environment.
            </p>
          </div>
          <a
            href="#"
            className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4"
          >
            Get started
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LeftImageWithCta;
