'use client';

import React, { useEffect, useState } from 'react';
import { I_UserSchema } from '@/lib/types';
import useUser from '@/lib/store';

const Profile = () => {
  const [user, setUser] = useState<I_UserSchema | null>(null);
  useEffect(() => {
    useUser
      .getState()
      .getUser()
      .then((d) => {
        setUser(d);
        console.log(d);
      });
  }, []);

  return (
    <div className="h-screen bg-black text-white">
      <nav className="flex justify-between border-b border-b-gray-800 px-3 pt-5">
        <div className="h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42px"
            height="32px"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 298 511.93"
            fill="white"
          >
            <path
              fillRule="nonzero"
              d="M285.77 441c16.24 16.17 16.32 42.46.15 58.7-16.16 16.24-42.45 16.32-58.69.16l-215-214.47c-16.24-16.16-16.32-42.45-.15-58.69L227.23 12.08c16.24-16.17 42.53-16.09 58.69.15 16.17 16.24 16.09 42.54-.15 58.7l-185.5 185.04L285.77 441z"
            />
          </svg>
        </div>

        <div className="m-auto w-full text-center">
          <h1 className="pb-5 text-xl font-medium  text-white">Edit Profile</h1>
        </div>

        <div className="h-8 w-8">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="38px"
            height="38px"
            viewBox="0 0 122.88 122.878"
            enableBackground="new 0 0 122.88 122.878"
            fill="white"
          >
            <g>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M101.589,14.7l8.818,8.819c2.321,2.321,2.321,6.118,0,8.439l-7.101,7.101 c1.959,3.658,3.454,7.601,4.405,11.752h9.199c3.283,0,5.969,2.686,5.969,5.968V69.25c0,3.283-2.686,5.969-5.969,5.969h-10.039 c-1.231,4.063-2.992,7.896-5.204,11.418l6.512,6.51c2.321,2.323,2.321,6.12,0,8.44l-8.818,8.819c-2.321,2.32-6.119,2.32-8.439,0 l-7.102-7.102c-3.657,1.96-7.601,3.456-11.753,4.406v9.199c0,3.282-2.685,5.968-5.968,5.968H53.629 c-3.283,0-5.969-2.686-5.969-5.968v-10.039c-4.063-1.232-7.896-2.993-11.417-5.205l-6.511,6.512c-2.323,2.321-6.12,2.321-8.441,0 l-8.818-8.818c-2.321-2.321-2.321-6.118,0-8.439l7.102-7.102c-1.96-3.657-3.456-7.6-4.405-11.751H5.968 C2.686,72.067,0,69.382,0,66.099V53.628c0-3.283,2.686-5.968,5.968-5.968h10.039c1.232-4.063,2.993-7.896,5.204-11.418l-6.511-6.51 c-2.321-2.322-2.321-6.12,0-8.44l8.819-8.819c2.321-2.321,6.118-2.321,8.439,0l7.101,7.101c3.658-1.96,7.601-3.456,11.753-4.406 V5.969C50.812,2.686,53.498,0,56.78,0h12.471c3.282,0,5.968,2.686,5.968,5.969v10.036c4.064,1.231,7.898,2.992,11.422,5.204 l6.507-6.509C95.471,12.379,99.268,12.379,101.589,14.7L101.589,14.7z M61.44,36.92c13.54,0,24.519,10.98,24.519,24.519 c0,13.538-10.979,24.519-24.519,24.519c-13.539,0-24.519-10.98-24.519-24.519C36.921,47.9,47.901,36.92,61.44,36.92L61.44,36.92z"
              />
            </g>
          </svg>
        </div>
      </nav>
      <section className="flex flex-row justify-center pb-4 pt-7 align-middle">
        <div className="w-full pb-10">
          <div className=" outline-3 m-auto aspect-square w-24 overflow-hidden rounded-full outline outline-blue-500">
            <img
              className="h-full w-full"
              src={user?.picture ?? ''}
              alt="Prifle Image"
            />
          </div>
        </div>
        <div className=" flex w-full flex-col align-baseline">
          <h2 className="text-2xl font-medium text-white ">
            {(user?.first_name ?? '') + ' ' + (user?.last_name ?? '')}
          </h2>
          <span className="text-md font-light text-gray-400">
            Last active:{' '}
            <label className="text-gray-300">
              {user?.created_at
                ? new Date(user?.created_at).toLocaleDateString()
                : ''}
            </label>
          </span>
        </div>
      </section>
      <section className="mx-14">
        <div className="flex justify-between">
          <span className="text-xl text-white">Personal Information</span>
          <div className="font-medium text-blue-600">Edit</div>
        </div>
        {/* Data Section */}
        <div className="my-1.5 flex justify-between rounded-t-xl bg-slate-900 py-2">
          <label className="px-4 font-light text-slate-400">Email</label>
          <span className="pr-4">{user?.email ?? ''}</span>
        </div>
        <div className="my-1.5 flex justify-between bg-slate-900 py-2">
          <label className="px-4 font-light text-slate-400">First name</label>
          <span className="pr-4">{user?.first_name ?? ''}</span>
        </div>
        <div className="my-1.5 flex justify-between bg-slate-900 py-2">
          <label className="px-4 font-light text-slate-400">Last name</label>
          <span className="pr-4">{user?.last_name ?? ''}</span>
        </div>
        <div className="my-1.5 flex justify-between bg-slate-900 py-2">
          <label className="px-4 font-light text-slate-400">Publications</label>
          <span className="pr-4">{14}</span>
        </div>
        <div className="my-1.5 flex justify-between bg-slate-900 py-2">
          <label className="px-4 font-light text-slate-400">Friends</label>
          <span className="pr-4">{300}</span>
        </div>
        <div className="my-1.5 flex justify-between rounded-b-xl bg-slate-900 py-2">
          <label className="px-4 font-light text-slate-400">Email</label>
          <span className="pr-4">{user?.email ?? ''}</span>
        </div>

        <div className="flex justify-between py-4">
          <span className="text-xl text-white">Personal Information</span>
          <div className="font-medium text-blue-600">Edit</div>
        </div>
        <div className="my-1.5 flex justify-between rounded-t-xl bg-slate-900 py-2">
          <label className="px-4 font-light text-slate-400">Email</label>
          <span className="pr-4">{user?.email ?? ''}</span>
        </div>
        <div className="my-1.5 flex justify-between bg-slate-900 py-2">
          <label className="px-4 font-light text-slate-400">First name</label>
          <span className="pr-4">{user?.first_name ?? ''}</span>
        </div>
        <div className="my-1.5 flex justify-between rounded-b-xl bg-slate-900 py-2">
          <label className="px-4 font-light text-slate-400">Email</label>
          <span className="pr-4">{user?.email ?? ''}</span>
        </div>
      </section>
    </div>
  );
};

export default Profile;

// const asd = {
//   created_at: '2024-02-03T11:21:28.148Z',
//   email: 'user_2@gmail.com',
//   first_name: 'Biligual',
//   id: '0785af03-59e5-4b9c-a22d-eb194595f055',
//   last_active_at: '2024-02-03T19:43:26.002Z',
//   last_name: 'Malinug',
//   password: '$2b$10$OPBh1im3G0VpbVEDTOxGPOt5pr1mF3VGnVl1C7LIgphU9JHgJnA9a',
//   picture:
//     'https://openseauserdata.com/files/3d825b936774e0ae3c8247613c91d436.png',
//   updated_at: '2024-02-03T11:21:28.148Z',
//   username: 'user_2',
// };
