'use server';

import React from 'react';
import Footer from '@/components/Footer';
import HomePageNavbar from '@/components/HomePageNavbar';
import DataSection from '@/components/LandingPage/DataSection';
import UserTestimonial from '@/components/LandingPage/UserTestimonial';
import Newsletter from '@/components/LandingPage/Newsletter';
import LeftImageWithCta from '@/components/LandingPage/LeftImageWithCTA';
import RightImageWithCta from '@/components/LandingPage/RightImageWithCTA';

export default async function Home() {
  return (
    <>
      <HomePageNavbar />
      <main className="flex min-h-screen flex-col items-center">
        {/* Hero Section */}
        <div className="landing-page-background w-full md:shadow-xl">
          <section className="mx-auto w-screen ">
            <div className="flex h-screen w-full flex-col-reverse items-start border-t-2 bg-right px-4 py-16 shadow-md md:h-1/2 md:flex-row lg:h-screen lg:justify-around lg:shadow-none xl:border-none">
              <div className="lg:mt-20">
                <div className="w-full border-y-2 border-y-gray-300 px-4 py-8 md:w-4/5">
                  <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl md:text-gray-900 lg:text-6xl xl:text-7xl 2xl:text-8xl">
                    Regain{' '}
                    <mark className="rounded bg-white px-2 text-blue-600 md:bg-blue-600 md:text-white">
                      connection
                    </mark>{' '}
                    with your world
                  </h1>
                  <p className="mt-8 text-lg font-normal text-white md:text-gray-500 lg:text-2xl ">
                    <strong>Pocket Chat</strong> is where community and
                    technology meet. Here, we leverage cutting-edge features to
                    enhance your connections and fostering meaningful
                    interactions growth.
                  </p>
                </div>
              </div>

              <img
                src="https://dwglogo.com/wp-content/uploads/2017/08/gopher_hanging_left_purple.png"
                alt=""
                className="my-auto h-auto md:w-auto md:overflow-hidden md:object-scale-down lg:h-full lg:object-none lg:object-scale-down lg:py-40 2xl:overflow-visible"
              />
            </div>
          </section>
        </div>

        <LeftImageWithCta />

        <DataSection />

        <RightImageWithCta />

        {/* Content Section */}
        <section className="body-font pb-12 text-gray-600">
          <section className="py-8">
            <UserTestimonial />
          </section>

          <Newsletter />
        </section>
      </main>
      <Footer />
    </>
  );
}
