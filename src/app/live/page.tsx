'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { listLives } from '@/lib/queries/live';
import { T_LivePopulated } from '@/lib/types';

const ListLives = () => {
  const [lives, setLives] = useState<T_LivePopulated[]>([]);

  useEffect(() => {
    listLives().then((d) => {
      setLives(d);
      console.log(d);
    });
  }, []);

  return (
    <>
      <Navbar />
      <section className=''>
        {lives.map((live, index) => (
          <article key={index} className="w-full">
            <img src={live.user_picture} />
            {JSON.stringify(live)}
          </article>
        ))}
      </section>
    </>
  );
};

export default ListLives;
