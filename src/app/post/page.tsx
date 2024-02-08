'use client';

import React from 'react';
import VideoUpload from '@/components/functional/VideoUpload';

const Post: React.FC = () => {
  return (
    <section className="px-10 py-4" style={{ height: '50vh' }}>
      <VideoUpload />
    </section>
  );
};

export default Post;
