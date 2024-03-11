import React from 'react';

const Page = () => {

  const handleClick1 = () => {

  }

  return (
    <div className="flex h-screen w-screen justify-start align-middle ">
      <div className="w-full mt-48">
        <button
          onClick={handleClick1}
          className="mx-auto bg-red-600 p-10">
          PEPEGA</button>
      </div>
    </div>
  );
};

export default Page;
