import Link from "next/link";

const Sidebar: React.FC = () => {
	const sidebar_items = [
		{
			name: "Home",
			link: "/",
		},
		{
			name: "Booking",
			link: "/booking",
		},
		// {
		// 	name: "Calendar View",
		// 	link: "/calendar",
		// },
	];
	return (
		<>
			<div className="hidden sm:block bg-gray-800 text-white p-4 w-64 h-full fixed top-0 left-0 shadow-lg">
				<div className="flex justify-center items-center font-bold text-2xl pb-4 mb-4 border-b-2 border-gray-700">
					Table Booking
				</div>
				<div className="flex">
					<ol className="list-none ml-2 flex flex-col space-y-4 justify-center items-start">
						{sidebar_items.map((item, index) => (
							<li key={index} className="text-xl">
								<Link
									href={item.link}
									className="hover:text-blue-400 transition duration-300 ease-in-out space-x-2 flex align-baseline justify-center items-center">
									<span>{item.name}</span>
								</Link>
							</li>
						))}
					</ol>
				</div>
			</div>

			<div className="block sm:hidden bg-gray-800 text-white p-4 w-full fixed top-0 left-0 shadow-lg">
				<div className="flex justify-center items-center font-bold text-2xl pb-4 mb-4 border-b-2 border-gray-700">
					Table Booking
				</div>
				<div className="flex justify-around">
					{sidebar_items.map((item, index) => (
						<Link
							key={index}
							href={item.link}
							className="text-xl hover:text-blue-400 transition duration-300 ease-in-out space-x-2 flex align-baseline justify-center items-center">
							<span>{item.name}</span>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default Sidebar;
