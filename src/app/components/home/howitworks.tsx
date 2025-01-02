import { FaCalendarAlt, FaUser, FaCheckCircle } from "react-icons/fa"; // Importing icons from react-icons

const steps = [
	{
		icon: <FaCalendarAlt className="text-5xl text-blue-500 mb-4" />,
		title: "Select Date & Time",
		description: "Choose the date and time that works best for you.",
	},
	{
		icon: <FaUser className="text-5xl text-blue-500 mb-4" />,
		title: "Enter Reservation Details",
		description: "Fill in your details and the number of guests.",
	},
	{
		icon: <FaCheckCircle className="text-5xl text-blue-500 mb-4" />,
		title: "Confirm Booking",
		description: "Review your reservation and confirm your booking.",
	},
];

const HowItWorks = () => {
	return (
		<div className="py-16 bg-gray-100">
			<h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
			<div className="flex flex-col md:flex-row justify-center items-center mx-5 space-y-4 md:space-y-0 md:space-x-4 px-4 md:px-0">
				{steps.map((step, index) => (
					<div
						key={index}
						className="flex flex-col items-center justify-center text-center p-6 bg-white shadow-lg rounded-lg w-full md:w-1/3 mx-0 h-64">
						{step.icon}
						<h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
						<p className="text-gray-600">{step.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default HowItWorks;
