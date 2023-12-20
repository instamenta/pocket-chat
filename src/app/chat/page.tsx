'use client';

import React from 'react'

export default function Chat() {
	const [flash, setFlash] = React.useState(false);

	const handleClick = () => {
		setFlash(true);
		setTimeout(() => setFlash(false), 400);
	};

	return (<>
			<div className="w-full py-4 px-6">
				<div
					className={`bg-blue-50 w-full drop-shadow-lg border-t-gray-300 border-t rounded-xl flex flex-row justify-around transition-all ${
						flash ? 'border-gray-100 shadow-2xl shadow-cyan-300 animate-flash border-1' : ''
					}`}>
					<input className="w-full h-full bg-transparent m-1 p-2 rounded-l-3xl
														focus:bg-gray-50 focus:outline-0 focus:bg-transparent"/>
					<button className={`pr-3 rounded-r-3xl transition-transform ${
						flash ? 'animate-flash scale-110' : ''
					}`} onClick={handleClick}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 50 50"
						>
							<path
								d="M 21 3 C 11.622998 3 4 10.623005 4 20 C 4 29.376995 11.622998 37 21 37 C 24.712383 37 28.139151 35.791079 30.9375 33.765625 L 44.085938 46.914062 L 46.914062 44.085938 L 33.886719 31.058594 C 36.443536 28.083 38 24.223631 38 20 C 38 10.623005 30.377002 3 21 3 z M 21 5 C 29.296122 5 36 11.703883 36 20 C 36 28.296117 29.296122 35 21 35 C 12.703878 35 6 28.296117 6 20 C 6 11.703883 12.703878 5 21 5 z"></path>
						</svg>
					</button>
				</div>
			</div>
			<section className="w-full bg-gray-white py-3 px-5 flex flex-row overflow-x-auto scrollbar-sm">
				<div className="flex-none mr-4 last:mr-0">
					<div
						className="bg-blue-500 w-12 h-12 rounded-full flex justify-center items-center align-middle">
						<svg xmlns="http://www.w3.org/2000/svg"
						     viewBox="0 0 24 24"
						     fill="none"
						     stroke="white"
						     strokeWidth="2"
						     strokeLinecap="round"
						     strokeLinejoin="round"
						     className="feather feather-plus">
							<line x1="12" y1="5" x2="12" y2="19"></line>
							<line x1="5" y1="12" x2="19" y2="12"></line>
						</svg>
					</div>
				</div>
				<div className="flex-none mr-4 last:mr-0 w-14 flex flex-col justify-center items-center">
					<div className="border-2 border-white outline outline-blue-500 bg-green-400 w-12 h-12 rounded-full"/>
					<p className="w-16 pt-2 text-xs font-medium text-center text-gray-600 truncate capitalize">Jam</p>
				</div>
				<div className="flex-none mr-4 last:mr-0 w-14 flex flex-col justify-center items-center">
					<div className="border-2 border-white outline outline-blue-500 bg-green-400 w-12 h-12 rounded-full"/>
					<p className="w-16 pt-2 text-xs font-medium text-center text-gray-600 truncate capitalize">Tutankamon</p>
				</div>
				<div className="flex-none mr-4 last:mr-0 w-14 flex flex-col justify-center items-center">
					<div className="border-2 border-white outline outline-blue-500 bg-green-400 w-12 h-12 rounded-full"/>
					<p className="w-16 pt-2 text-xs font-medium text-center text-gray-600 truncate capitalize">Samuel</p>
				</div>
				<div className="flex-none mr-4 last:mr-0 w-14 flex flex-col justify-center items-center">
					<div className="border-2 border-white outline outline-blue-500 bg-green-400 w-12 h-12 rounded-full"/>
					<p className="w-16 pt-2 text-xs font-medium text-center text-gray-600 truncate capitalize">Myname</p>
				</div>
				<div className="flex-none mr-4 last:mr-0 w-14 flex flex-col justify-center items-center">
					<div className="border-2 border-white outline outline-blue-500 bg-green-400 w-12 h-12 rounded-full"/>
					<p className="w-16 pt-2 text-xs font-medium text-center text-gray-600 truncate capitalize">Anaastasiq</p>
				</div>
				<div className="flex-none mr-4 last:mr-0 w-14 flex flex-col justify-center items-center">
					<div className="border-2 border-white outline outline-blue-500 bg-green-400 w-12 h-12 rounded-full"/>
					<p className="w-16 pt-2 text-xs font-medium text-center text-gray-600 truncate capitalize">Anatahuan</p>
				</div>
				<div className="flex-none mr-4 last:mr-0 w-14 flex flex-col justify-center items-center">
					<div className="border-2 border-white outline outline-blue-500 bg-green-400 w-12 h-12 rounded-full"/>
					<p className="w-16 pt-2 text-xs font-medium text-center text-gray-600 truncate capitalize">Anatahuan</p>
				</div>
				<div className="flex-none mr-4 last:mr-0 w-14 flex flex-col justify-center items-center">
					<div className="border-2 border-white outline outline-blue-500 bg-green-400 w-12 h-12 rounded-full"/>
					<p className="w-16 pt-2 text-xs font-medium text-center text-gray-600 truncate capitalize">Anatahuan</p>
				</div>

			</section>


			<div className='bg-black w-full h-full'>

			</div>
		</>
	)
}
