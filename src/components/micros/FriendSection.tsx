import React from 'react';
import { FriendCard } from '@/components/micros/FriendCard';
import { T_friendRequestLists } from '@/lib/queries/friend';

type T_props = { list: Array<T_friendRequestLists>, header: string }

const FriendSection = ({ list, header }: T_props) => {
  return (
    <>
      <div className="mt-2 w-full border-b-2 border-t-2 border-gray-300 shadow-2xl ">
        <h1 className="px-8 text-3xl font-extrabold text-gray-500">{header}</h1>
      </div>
      <section className="grid grid-cols-2 gap-3 px-8 pt-8">
        {list.map((user, index) => (
          <FriendCard
            user={user}
            index={index}
            key={index}
          />
        ))}
        {!list.length ? (
          <div className="col-span-2 flex w-full pb-8">
            <h2 className="m-auto text-center text-3xl font-light text-slate-500">
              ( Empty )
            </h2>
          </div>
        ) : <></>}
      </section>
    </>
  );
};

export default FriendSection;