"use server";

import Footer from "@/components/Footer";
import React from "react";

export default async function Home() {
	return (<>
			<main className="flex min-h-screen flex-col items-center justify-between">
				{/* Hero Section */}
				<section className="w-full">
					<div
						className="shadow-md border-t-2 h-1/2 round-xxxl flex items-start flex-col p-16 object-contain bg-right bg-no-repeat "
						style={{
							backgroundImage:
								"url(https://static.velvetcache.org/pages/2018/06/13/party-gopher/dancing-gopher.gif)",
						}}
					>
						<div className="w-3/5 border-t-gray-200 border-t-2">
							<h1 className="text-4xl py-8 font-medium font-serif">
								Wanting to keep in touch without compromising your data?
							</h1>
						</div>
						<button className="px-11 py-4  bg-white border-2 text-gray-800 transition-all shadow-inner shadow-gray-500
          hover:bg-slate-100 hover:border-slate-400">
							Learn more
						</button>
					</div>
				</section>

				{/* Content Section */}
				<section className="text-gray-600 body-font pb-12">
					<div className="container px-5 pt-14 mx-auto">
						{/* Content Header */}
						<div className="flex flex-wrap w-full pt-5 pb-5 mb-10 flex-col items-center text-center">
							<h1 className="sm:text-4xl text-2xl font-semibold title-font mb-2 text-gray-900">
								Trusted by experts
							</h1>
							<p className="lg:w-1/2 w-full text-pretty leading-relaxed text-gray-500">
								Working with professionals since 2021 to make the web a better
								place.
							</p>
						</div>

						{/* Content Card */}
						<div className="flex flex-wrap -m-4">
							<div className="xl:w-1/3 md:w-1/2 p-4">
								<div className="bg-white border border-gray-300 p-6 rounded-lg">
									<div
										className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
										<svg
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-6 h-6"
											viewBox="0 0 24 24"
										>
											<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
										</svg>
									</div>
									<h2 className="text-lg text-gray-900 font-medium title-font mb-2">
										Shooting Stars
									</h2>
									<p className="leading-relaxed text-base">
										Fingerstache flexitarian street art 8-bit waist co, subway
										tile poke farm.
									</p>
								</div>
							</div>

							{/* Content Card */}
							<div className="xl:w-1/3 md:w-1/2 p-4">
								<div className="bg-white border border-gray-300 p-6 rounded-lg">
									<div
										className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
										<svg
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-6 h-6"
											viewBox="0 0 24 24"
										>
											<circle cx="6" cy="6" r="3"></circle>
											<circle cx="6" cy="18" r="3"></circle>
											<path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
										</svg>
									</div>
									<h2 className="text-lg text-gray-900 font-medium title-font mb-2">
										The Catalyzer
									</h2>
									<p className="leading-relaxed text-base">
										Fingerstache flexitarian street art 8-bit waist co, subway
										tile poke farm.
									</p>
								</div>
							</div>

							{/* Content Card */}
							<div className="xl:w-1/3 md:w-1/2 p-4">
								<div className="bg-white border border-gray-300 p-6 rounded-lg">
									<div
										className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
										<svg
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-6 h-6"
											viewBox="0 0 24 24"
										>
											<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
											<circle cx="12" cy="7" r="4"></circle>
										</svg>
									</div>
									<h2 className="text-lg text-gray-900 font-medium title-font mb-2">
										Neptune
									</h2>
									<p className="leading-relaxed text-base">
										Fingerstache flexitarian street art 8-bit waist co, subway
										tile poke farm.
									</p>
								</div>
							</div>

							{/* Content Card */}
							<div className="xl:w-1/3 md:w-1/2 p-4">
								<div className="bg-white border border-gray-300 p-6 rounded-lg">
									<div
										className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
										<svg
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-6 h-6"
											viewBox="0 0 24 24"
										>
											<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
										</svg>
									</div>
									<h2 className="text-lg text-gray-900 font-medium title-font mb-2">
										Melanchole
									</h2>
									<p className="leading-relaxed text-base">
										Fingerstache flexitarian street art 8-bit waist co, subway
										tile poke farm.
									</p>
								</div>
							</div>

							{/* Content Card */}
							<div className="xl:w-1/3 md:w-1/2 p-4">
								<div className="bg-white border border-gray-300 p-6 rounded-lg">
									<div
										className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
										<svg
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-6 h-6"
											viewBox="0 0 24 24"
										>
											<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
										</svg>
									</div>
									<h2 className="text-lg text-gray-900 font-medium title-font mb-2">
										Bunker
									</h2>
									<p className="leading-relaxed text-base">
										Fingerstache flexitarian street art 8-bit waist co, subway
										tile poke farm.
									</p>
								</div>
							</div>

							{/* Content Card */}
							<div className="xl:w-1/3 md:w-1/2 p-4">
								<div className="bg-white border border-gray-300 p-6 rounded-lg">
									<div
										className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
										<svg
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-6 h-6"
											viewBox="0 0 24 24"
										>
											<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
										</svg>
									</div>
									<h2 className="text-lg text-gray-900 font-medium title-font mb-2">
										Ramona Falls
									</h2>
									<p className="leading-relaxed text-base">
										Fingerstache flexitarian street art 8-bit waist co, subway
										tile poke farm.
									</p>
								</div>
							</div>
						</div>

						{/* <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button> */}
					</div>
				</section>
			</main>
			<Footer/>
		</>
	);
}
