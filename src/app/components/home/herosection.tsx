import Link from "next/link";

const HeroSection = () => {
	return (
		<section
			className="relative bg-cover bg-center h-screen"
			style={{ backgroundImage: "url('/dine.jpg')" }}>
			<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
				<div className="text-center text-white px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
						Reserve Your Table at Restaurant Today!
					</h1>
					<p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8">
						Experience fine dining and exceptional service.
					</p>
					<Link
						href="/booking"
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded inline-block">
						Book Now
					</Link>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
