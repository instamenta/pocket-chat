'use client';

import React from 'react';
import { I_Recommendation } from '@/lib/types';
import { IoMdClose } from "react-icons/io";
import ImageCarousel from '@/components/functional/ImageCarousel';

const PublicationDetails = ({
  publication,
  onClose,
}: {
  publication: I_Recommendation;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 px-2">
      <div className="relative flex min-h-screen items-center justify-center">
        <div className="mx-auto w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-lg">
          <nav className="flex flex-row-reverse py-1 px-2">
            <button
              onClick={onClose}
              className="rounded-full hover:bg-slate-100 transition-all hover:scale-110"
            >
              <IoMdClose className="w-8 h-8" />
            </button>
          </nav>

          {/* Modal content */}
          <div className="">
            {/* Images */}
            <ImageCarousel images={publication.images} />

            <h2 className="text-lg font-bold">{publication.publisher}</h2>
            <p>{publication.description}</p>

            {/* Close button */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationDetails;
