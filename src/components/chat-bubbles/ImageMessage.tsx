import React from 'react';

const ImageMessage = () => {
  return (
    <div className="mt-6 flex items-start gap-2.5">
      <img
        className="h-8 w-8 rounded-full"
        src="/docs/images/people/profile-picture-3.jpg"
        alt="Jese image"
      />
      <div className="flex flex-col gap-1">
        <div className="bg-white shadow-xl leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl border-gray-200 p-4 pb-2">
          <p className="text-sm font-normal text-gray-900">
            I'm working from home today! 😅
          </p>
          <div className="group relative my-2.5">
            <div className="absolute flex h-full w-full items-center justify-center rounded-lg bg-gray-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                data-tooltip-target="download-image"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-gray-50"
              >
                <svg
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                  />
                </svg>
              </button>
              <div
                id="download-image"
                role="tooltip"
                className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
              >
                Download image
                <div className="tooltip-arrow" data-popper-arrow=""></div>
              </div>
            </div>
            <img src="data:image/jpeg;base64,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" className="rounded-lg" />
          </div>
        </div>
        <span className="text-sm font-normal text-gray-500">
          Delivered
        </span>
      </div>
      <button
        id="dropdownMenuIconButton"
        data-dropdown-toggle="dropdownDots"
        data-dropdown-placement="bottom-start"
        className="inline-flex items-center self-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50"
        type="button"
      >
        <svg
          className="h-4 w-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
      <div
        id="dropdownDots"
        className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow"
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownMenuIconButton"
        >
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Reply
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Forward
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Copy
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Report
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImageMessage;
