'use client';

import React from 'react';

export default function Chat() {
  return (<>
    <section
      className="w-full h-full border-gray-300 px-5 py-5 pt-6 shadow-xl rounded-b-3xl flex flex-row justify-between">

      <div className="flex flex-row">
        <div className="flex flex-row h-full content-center pr-6">
          <div
            className="p-4 pr-8 mb-3 border-b-cyan-700 transition-all  hover:-translate-x-2 hover:scale-125">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512" className="scale-150">
              <path
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </div>
          <div className="bg-red-950 w-12 h-12 rounded-full" />
        </div>

        <div className="w-full flex flex-col">
          <p className="text-nowrap font-bold text-gray-800">Sebastian Dragovich</p>
          <p className="font-normal text-blue-500">Active</p>
        </div>
      </div>

      <div className="h-full flex flex-row justify-center px-5 py-2">
        <div className="pr-5">
          <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 576 512">
            <path
              d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
          </svg>
        </div>
        <div className="px-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="32" width="25" viewBox="0 0 512 512">
            <path
              d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z" />
          </svg>
        </div>
      </div>

    </section>
    <section className="w-full fixed bottom-0 p-10 bg-blue-500 rounded-t-3xl shadow-xl flex flex-row">
      <input className="w-full pl-4" placeholder="Type here..." />
      <div className="flex flex-row gap-3 pl-6">
        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 512 512">
          <path
            d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30"
             viewBox="0 0 512 512">
          <path
            d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
        </svg>
      </div>
    </section>
  </>);
};
