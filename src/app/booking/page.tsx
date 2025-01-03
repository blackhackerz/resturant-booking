"use client";
import React, { useState } from "react";
import Sidebar from "../components/sidebar";

const inputFields = [
	{
		id: "name",
		label: "Name",
		type: "text",
		placeholder: "Name",
		regex: /^[a-zA-Z\s]+$/,
	},
	{
		id: "email",
		label: "Email",
		type: "email",
		placeholder: "Email",
		regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	},
	{
		id: "phone",
		label: "Phone",
		type: "text",
		placeholder: "Phone",
		regex: /^\d{10}$/,
	},
	{
		id: "date",
		label: "Date",
		type: "date",
		placeholder: "Date",
		regex: /^\d{4}-\d{2}-\d{2}$/,
	},
	{
		id: "time",
		label: "Time",
		type: "time",
		placeholder: "Time",
		regex: /^([01]\d|2[0-3]):([0-5]\d)$/,
	},
	{
		id: "guests",
		label: "Guests",
		type: "number",
		placeholder: "Guests",
		regex: /^([1-9]|1[0-9]|20)$/,
	},
];

const Page: React.FC = () => {
	const [formData, setFormData] = useState<{ [key: string]: string }>({});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [availableSlots, setAvailableSlots] = useState<
		{ date: string; time: string; available: boolean }[]
	>([]);
	const [reservationDetails, setReservationDetails] = useState<{
		[key: string]: string;
	} | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });

		const field = inputFields.find((field) => field.id === id);
		if (field && !field.regex.test(value)) {
			setErrors({ ...errors, [id]: `Invalid ${field.label}` });
		} else {
			const newErrors = { ...errors };
			delete newErrors[id];
			setErrors(newErrors);
		}
	};

	const fetchAvailability = async () => {
		if (!formData.date) {
			alert("Please select a date first.");
			return;
		}
		if (!formData.guests) {
			alert("Please enter the number of guests first.");
			return;
		}
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/availability?date=${formData.date}&guests=${formData.guests}`,
			);
			if (response.ok) {
				const data = await response.json();
				setAvailableSlots(data);
			} else {
				alert("Failed to fetch availability");
			}
		} catch (error) {
			console.error("Error fetching availability:", error);
			alert("Error fetching availability");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: { [key: string]: string } = {};
		inputFields.forEach((field) => {
			if (!formData[field.id]) {
				newErrors[field.id] = `${field.label} is required`;
			}
		});

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		if (Object.keys(errors).length === 0) {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/submit`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(formData),
					},
				);
				if (response.ok) {
					console.log("Form submitted successfully");
					setFormData({});
					setSubmitError(null);
					setSuccessMessage("Form submitted successfully!");
					setReservationDetails(formData); // Set reservation details
				} else {
					const message =
						(await response.json()).message || "Form submission failed";
					setSubmitError(message);
					setSuccessMessage(null);
				}
			} catch (error) {
				console.error("Error submitting form:", error);
				setSubmitError("Error submitting form");
				setSuccessMessage(null);
			}
		} else {
			console.log("Errors:", errors);
		}
	};

	return (
		<>
			<Sidebar />
			<div className="md:ml-64 flex flex-col justify-center min-h-screen bg-gray-100">
				<div className="flex justify-center items-center mt-10 px-4">
					<div className="text-4xl font-semibold text-gray-800">
						Book your table now
					</div>
				</div>
				<div className="flex justify-center items-center mt-10 px-4">
					<form
						className="w-full max-w-lg bg-white p-4 md:p-8 rounded-lg shadow-md"
						onSubmit={handleSubmit}>
						{inputFields.map((field) => (
							<div className="mb-6" key={field.id}>
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor={field.id}>
									{field.label}
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id={field.id}
									type={field.type}
									placeholder={field.placeholder}
									value={formData[field.id] || ""}
									onChange={handleChange}
								/>
								{errors[field.id] && (
									<p className="text-red-500 text-xs italic">
										{errors[field.id]}
									</p>
								)}
							</div>
						))}
						<div className="flex items-center justify-between mb-4">
							<button
								type="button"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={fetchAvailability}>
								Check Availability
							</button>
						</div>
						{availableSlots.length > 0 ? (
							<div className="mb-6">
								<h3 className="text-lg font-bold text-gray-700 mb-2">
									Available Time Slots
								</h3>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{availableSlots.length > 0 ? (
										availableSlots.map((slot, index) => (
											<button
												key={index}
												type="button"
												className={`py-2 px-4 rounded text-white ${
													slot.available
														? "bg-green-500 hover:bg-green-600"
														: "bg-gray-300 cursor-not-allowed"
												}`}
												disabled={!slot.available}
												onClick={() =>
													setFormData((prev) => ({ ...prev, time: slot.time }))
												}>
												{slot.time}
											</button>
										))
									) : (
										<p className="text-red-500 text-xs italic mb-4">
											No available slots found.
										</p>
									)}
								</div>
							</div>
						) : (
							<p className="text-red-500 text-xs italic mb-4">
								No available slots found.
							</p>
						)}
						{submitError && (
							<p className="text-red-500 text-xs italic mb-4">{submitError}</p>
						)}
						{successMessage && (
							<p className="text-green-500 text-xs italic mb-4">
								{successMessage}
							</p>
						)}
						<div className="flex items-center justify-between">
							<button
								className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit">
								Submit
							</button>
						</div>
					</form>
				</div>
				{reservationDetails && (
					<div className="flex justify-center items-center mt-10 px-4">
						<div className="w-full max-w-lg bg-white p-4 md:p-8 rounded-lg shadow-md">
							<h3 className="text-lg font-bold text-gray-700 mb-4">
								Reservation Details
							</h3>
							<ul>
								{Object.entries(reservationDetails).map(([key, value]) => (
									<li key={key} className="mb-2">
										<strong>
											{key.charAt(0).toUpperCase() + key.slice(1)}:
										</strong>{" "}
										{value}
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Page;
