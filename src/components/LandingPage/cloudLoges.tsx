import React from 'react';

const CloudLoges = () => {
  return (
    <section>
      <div className="relative mx-auto w-full max-w-7xl items-center px-5 py-12 md:px-12 lg:px-16">
        <div className="text-center">
          <h1 className="within 500 fortune companies text-lg font-medium uppercase leading-6 text-black">
            Worldwide trust within 500 fortune companies
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-0.5 pt-6 md:grid-cols-6">
          <div className="col-span-1 flex justify-center px-8">
            <img className="max-h-12" src="../images/logos/8.svg" alt="logo" />
          </div>
          <div className="col-span-1 flex justify-center px-8">
            <img className="max-h-12" src="../images/logos/2.svg" alt="logo" />
          </div>
          <div className="col-span-1 flex justify-center px-8">
            <img className="max-h-12" src="../images/logos/3.svg" alt="logo" />
          </div>
          <div className="col-span-1 flex justify-center px-8">
            <img className="max-h-12" src="../images/logos/4.svg" alt="logo" />
          </div>
          <div className="col-span-1 flex justify-center px-8">
            <img className="max-h-12" src="../images/logos/5.svg" alt="logo" />
          </div>
          <div className="col-span-1 flex justify-center px-8">
            <img className="max-h-12" src="../images/logos/6.svg" alt="logo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudLoges;