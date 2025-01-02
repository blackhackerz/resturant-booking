import HeroSection from "./components/home/herosection";
import HowItWorks from "./components/home/howitworks";
import Navbar from "./components/nav";

export default function Home() {
	return (
		<div className="">
			<Navbar />
			<HeroSection />
			<HowItWorks />
		</div>
	);
}
