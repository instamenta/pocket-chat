import React from 'react';

type T_Props = { children: React.ReactNode };

export default function AuthenticationLayout({ children }: T_Props) {
  const containerStyle: React.CSSProperties = {
    // backgroundImage: `url(https://i.pinimg.com/originals/67/a8/54/67a854516ec71095239398fe457825e1.png)`,
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'top',
  };

  return (
    <div className="m-0 h-screen bg-slate-100 p-0 w-screen">
      <div className="w-full bg-orange-600 pt-20" style={{ height: '40vh' }}>
        <div className="mx-12 h-1/2 w-auto border-2 border-red-950" />
      </div>
      <div
        className="mb-10 w-full rounded-br-full bg-orange-600"
        style={{
          height: '10vh',
          borderBottomLeftRadius: '9999px',
          borderBottomRightRadius: '9999px',
        }}
      />
      <section className="m-0 p-0 " style={containerStyle}>
        {children}
      </section>
    </div>
  );
}
