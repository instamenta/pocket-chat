'use server';

import Footer from '@/components/Footer';
import React from 'react';
import Navbar from '@/components/Navbar';

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between">
        {/* Hero Section */}
        <section className="w-full">
          <div
            className="round-xxxl flex h-1/2 flex-col items-start border-t-2 bg-right bg-no-repeat object-contain p-16 shadow-md "
            style={{
              backgroundImage:
                'url(https://static.velvetcache.org/pages/2018/06/13/party-gopher/dancing-gopher.gif)',
            }}
          >
            <div className="w-3/5 border-t-2 border-t-gray-200">
              <h1 className="py-8 font-serif text-4xl font-medium">
                Wanting to keep in touch without compromising your data?
              </h1>
            </div>
            <button
              className="border-2 bg-white  px-11 py-4 text-gray-800 shadow-inner shadow-gray-500 transition-all
          hover:border-slate-400 hover:bg-slate-100"
            >
              Learn more
            </button>
          </div>
        </section>

        {/* Content Section */}
        <section className="body-font pb-12 text-gray-600">
          <div className="container mx-auto px-5 pt-14">
            {/* Content Header */}
            <div className="mb-10 flex w-full flex-col flex-wrap items-center pb-5 pt-5 text-center">
              <h1 className="title-font mb-2 text-2xl font-semibold text-gray-900 sm:text-4xl">
                Trusted by experts
              </h1>
              <p className="text-pretty w-full leading-relaxed text-gray-500 lg:w-1/2">
                Working with professionals since 2021 to make the web a better
                place.
              </p>
            </div>

            {/* Content Card */}
            <div className="-m-4 flex flex-wrap">
              <div className="p-4 md:w-1/2 xl:w-1/3">
                <div className="rounded-lg border border-gray-300 bg-white p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
                    Shooting Stars
                  </h2>
                  <p className="text-base leading-relaxed">
                    Fingerstache flexitarian street art 8-bit waist co, subway
                    tile poke farm.
                  </p>
                </div>
              </div>

              {/* Content Card */}
              <div className="p-4 md:w-1/2 xl:w-1/3">
                <div className="rounded-lg border border-gray-300 bg-white p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="6" cy="6" r="3"></circle>
                      <circle cx="6" cy="18" r="3"></circle>
                      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                    </svg>
                  </div>
                  <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
                    The Catalyzer
                  </h2>
                  <p className="text-base leading-relaxed">
                    Fingerstache flexitarian street art 8-bit waist co, subway
                    tile poke farm.
                  </p>
                </div>
              </div>

              {/* Content Card */}
              <div className="p-4 md:w-1/2 xl:w-1/3">
                <div className="rounded-lg border border-gray-300 bg-white p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
                    Neptune
                  </h2>
                  <p className="text-base leading-relaxed">
                    Fingerstache flexitarian street art 8-bit waist co, subway
                    tile poke farm.
                  </p>
                </div>
              </div>

              {/* Content Card */}
              <div className="p-4 md:w-1/2 xl:w-1/3">
                <div className="rounded-lg border border-gray-300 bg-white p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                    </svg>
                  </div>
                  <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
                    Melanchole
                  </h2>
                  <p className="text-base leading-relaxed">
                    Fingerstache flexitarian street art 8-bit waist co, subway
                    tile poke farm.
                  </p>
                </div>
              </div>

              {/* Content Card */}
              <div className="p-4 md:w-1/2 xl:w-1/3">
                <div className="rounded-lg border border-gray-300 bg-white p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                    </svg>
                  </div>
                  <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
                    Bunker
                  </h2>
                  <p className="text-base leading-relaxed">
                    Fingerstache flexitarian street art 8-bit waist co, subway
                    tile poke farm.
                  </p>
                </div>
              </div>

              {/* Content Card */}
              <div className="p-4 md:w-1/2 xl:w-1/3">
                <div className="rounded-lg border border-gray-300 bg-white p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
                    Ramona Falls
                  </h2>
                  <p className="text-base leading-relaxed">
                    Fingerstache flexitarian street art 8-bit waist co, subway
                    tile poke farm.
                  </p>
                </div>
              </div>
            </div>

            {/* <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button> */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
