import React from 'react';

const TextMessage = () => {
  return (
    <div className="mt-6 flex items-start gap-2.5">
      <img
        className="h-8 w-8 rounded-full"
        src="/docs/images/people/profile-picture-3.jpg"
        alt="Jese image"
      />
      {/* Message Section */}
      <div className="leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-white px-4 pb-2 shadow-xl">
        <p className="py-2.5 text-sm font-normal text-gray-900">
          That&apos;s awesome. I think our users will really appreciate the
          improvements.
        </p>
        <span className="text-sm font-normal text-gray-500">Delivered</span>
      </div>

      {/* Side Button */}
      <button
        id="dropdownMenuIconButton"
        data-dropdown-toggle="dropdownDots"
        data-dropdown-placement="bottom-start"
        className="inline-flex items-center self-center rounded-lg border bg-white p-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50"
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

export default TextMessage;
