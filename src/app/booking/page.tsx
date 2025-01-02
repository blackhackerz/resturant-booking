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
		regex: /^[1-9]\d*$/,
	},
];

const Page: React.FC = () => {
	const [formData, setFormData] = useState<{ [key: string]: string }>({});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [submitError, setSubmitError] = useState<string | null>(null);

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
				const response = await fetch("/api/submit", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});
				if (response.ok) {
					console.log("Form submitted successfully");
					setFormData({});
					setSubmitError(null);
				} else {
					console.log(formData);

					setSubmitError("Form submission failed");
				}
			} catch (error) {
				console.error("Error submitting form:", error);
				setSubmitError("Error submitting form");
			}
		} else {
			console.log("Errors:", errors);
		}
	};

	return (
		<>
			<Sidebar />
			<div className="ml-64 flex flex-col justify-center min-h-screen bg-gray-100">
				<div className="flex justify-center items-center mt-10">
					<div className="text-4xl font-semibold text-gray-800">
						Book your table now
					</div>
				</div>
				<div className="flex justify-center items-center mt-10">
					<form
						className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
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
						{submitError && (
							<p className="text-red-500 text-xs italic mb-4">{submitError}</p>
						)}
						<div className="flex items-center justify-between">
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Page;
