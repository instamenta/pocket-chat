import {UserButton} from '@clerk/nextjs';

const Navbar = () => {
	return (
		<nav
			className="drop-shadow-xl bg-white p-4 mb-3 border-b-cyan-700 transition-all  hover:bg-slate-100">
			{/*border-b-4 hover:border-b-8*/}
			<div className="container mx-auto flex items-center justify-between">
				<div className="text-cyan-700 font-bold text-lg transition-transform hover:scale-125 hover:translate-x-4">Chatter</div>
				<div className="space-x-4 flex flex-row items-center">
					<a
						href="#"
						className="text-gray-800 hover:text-black hover:underline"
					>
						Home
					</a>
					<a
						href="/chat"
						className="text-gray-800 hover:text-black hover:underline"
					>
						Chat
					</a>
					<a
						href="#"
						className="text-gray-800 hover:text-black hover:underline"
					>
						Services
					</a>
					<div className="shadow-lg shadow-gray-400 rounded-full">
						<UserButton afterSignOutUrl="/"/>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
