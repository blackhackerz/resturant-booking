// "use client";
// import { useState, useEffect } from "react";
// import {
// 	format,
// 	startOfMonth,
// 	endOfMonth,
// 	eachDayOfInterval,
// 	isSameDay,
// 	isToday,
// } from "date-fns";

// interface Booking {
// 	_id: string;
// 	name: string;
// 	email: string;
// 	phone: string;
// 	date: string;
// 	time: string;
// }

// export default function FullCalendarPage() {
// 	const [currentMonth, setCurrentMonth] = useState(new Date());
// 	const [bookedSlots, setBookedSlots] = useState<Booking[]>([]);
// 	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchBookedSlots = async () => {
// 			try {
// 				const response = await fetch(
// 					`${process.env.NEXT_PUBLIC_API_BASE_URL}/getbooking`,
// 				);
// 				const data = await response.json();
// 				console.log("Fetched bookings:", data.bookings);

// 				setBookedSlots(
// 					data.bookings
// 						? data.bookings.map((booking: Booking) => ({
// 								...booking,
// 								date: new Date(booking.date),
// 						  }))
// 						: [],
// 				);
// 				setError(null);
// 			} catch (err) {
// 				console.error("Error fetching booked slots:", err);
// 				setError("Failed to fetch booked slots.");
// 			}
// 		};

// 		fetchBookedSlots();
// 	}, []);

// 	const daysInMonth = eachDayOfInterval({
// 		start: startOfMonth(currentMonth),
// 		end: endOfMonth(currentMonth),
// 	});

// 	const handlePrevMonth = () => {
// 		setCurrentMonth(
// 			new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)),
// 		);
// 	};

// 	const handleNextMonth = () => {
// 		setCurrentMonth(
// 			new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)),
// 		);
// 	};

// 	const isBooked = (date: Date) =>
// 		bookedSlots.some((slot) => isSameDay(new Date(slot.date), date));

// 	const handleDateClick = (date: Date) => {
// 		setSelectedDate(date);
// 	};

// 	return (
// 		<div className="container mx-auto px-4 py-8">
// 			<h1 className="text-2xl font-bold text-center">Calendar View</h1>

// 			<div className="flex justify-between items-center my-4">
// 				<button
// 					onClick={handlePrevMonth}
// 					className="bg-blue-500 text-white px-4 py-2 rounded">
// 					Previous
// 				</button>
// 				<h2 className="text-xl font-bold">
// 					{format(currentMonth, "MMMM yyyy")}
// 				</h2>
// 				<button
// 					onClick={handleNextMonth}
// 					className="bg-blue-500 text-white px-4 py-2 rounded">
// 					Next
// 				</button>
// 			</div>

// 			<div className="grid grid-cols-7 gap-2">
// 				{daysInMonth.map((date) => (
// 					<div
// 						key={date.toISOString()}
// 						onClick={() => handleDateClick(date)}
// 						className={`p-4 border rounded text-center cursor-pointer ${
// 							isToday(date) ? "bg-green-100" : "bg-gray-100"
// 						} ${isBooked(date) ? "bg-red-300" : ""}`}>
// 						<span className="block font-bold">{format(date, "dd")}</span>
// 						{isBooked(date) && (
// 							<span className="text-xs text-red-600">Booked</span>
// 						)}
// 					</div>
// 				))}
// 			</div>

// 			{selectedDate && (
// 				<div className="mt-4 p-4 border rounded bg-gray-100">
// 					<h3 className="text-lg font-bold">
// 						Bookings for {format(selectedDate, "dd MMMM, yyyy")}
// 					</h3>
// 					<ul>
// 						{bookedSlots.filter((slot) =>
// 							isSameDay(new Date(slot.date), selectedDate),
// 						).length === 0 ? (
// 							<li>No bookings for this date.</li>
// 						) : (
// 							bookedSlots
// 								.filter((slot) => isSameDay(new Date(slot.date), selectedDate))
// 								.map((slot, index) => (
// 									<li key={index} className="text-sm">
// 										<p>
// 											<strong>Name:</strong> {slot.name}
// 										</p>
// 										<p>
// 											<strong>Email:</strong> {slot.email}
// 										</p>
// 										<p>
// 											<strong>Phone:</strong> {slot.phone}
// 										</p>
// 										<p>
// 											<strong>Time:</strong> {slot.time}
// 										</p>
// 									</li>
// 								))
// 						)}
// 					</ul>
// 				</div>
// 			)}

// 			{error && <p className="text-red-500 mt-4">{error}</p>}
// 		</div>
// 	);
// }
