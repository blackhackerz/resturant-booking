"use client";
import React, { useEffect, useState } from "react";

interface Booking {
	_id: string;
	name: string;
	email: string;
	phone: string;
	date: string;
	time: string;
}

const AdminPage: React.FC = () => {
	const [data, setData] = useState<Booking[]>([]);
	const [editing, setEditing] = useState<Booking | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/getbooking`,
				);
				const result: Booking[] = await response.json();
				setData(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const handleDelete = async (id: string) => {
		try {
			await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/deletebooking/${id}`,
				{
					method: "DELETE",
				},
			);
			setData(data.filter((item) => item._id !== id));
		} catch (error) {
			console.error("Error deleting data:", error);
		}
	};

	const handleEdit = (booking: Booking) => {
		setEditing(booking);
	};

	const handleSave = async () => {
		if (editing) {
			try {
				await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/editbooking/${editing._id}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(editing),
					},
				);
				setData(
					data.map((item) => (item._id === editing._id ? editing : item)),
				);
				setEditing(null);
			} catch (error) {
				console.error("Error editing data:", error);
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (editing) {
			setEditing({ ...editing, [e.target.name]: e.target.value });
		}
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Admin Page</h1>
			<table className="min-w-full bg-white border border-gray-200">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b">ID</th>
						<th className="py-2 px-4 border-b">Name</th>
						<th className="py-2 px-4 border-b">Email</th>
						<th className="py-2 px-4 border-b">Phone</th>
						<th className="py-2 px-4 border-b">Date</th>
						<th className="py-2 px-4 border-b">Time</th>
						<th className="py-2 px-4 border-b">Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr key={item._id}>
							<td className="py-2 px-4 border-b">{item._id}</td>
							<td className="py-2 px-4 border-b">
								{editing?._id === item._id ? (
									<input
										type="text"
										name="name"
										value={editing.name}
										onChange={handleChange}
										className="border p-1"
									/>
								) : (
									item.name
								)}
							</td>
							<td className="py-2 px-4 border-b">
								{editing?._id === item._id ? (
									<input
										type="text"
										name="email"
										value={editing.email}
										onChange={handleChange}
										className="border p-1"
									/>
								) : (
									item.email
								)}
							</td>
							<td className="py-2 px-4 border-b">
								{editing?._id === item._id ? (
									<input
										type="text"
										name="phone"
										value={editing.phone}
										onChange={handleChange}
										className="border p-1"
									/>
								) : (
									item.phone
								)}
							</td>
							<td className="py-2 px-4 border-b">
								{editing?._id === item._id ? (
									<input
										type="date"
										name="date"
										value={editing.date}
										onChange={handleChange}
										className="border p-1"
									/>
								) : (
									new Date(item.date).toLocaleDateString()
								)}
							</td>
							<td className="py-2 px-4 border-b">
								{editing?._id === item._id ? (
									<input
										type="time"
										name="time"
										value={editing.time}
										onChange={handleChange}
										className="border p-1"
									/>
								) : (
									item.time
								)}
							</td>
							<td className="py-2 px-4 border-b">
								{editing?._id === item._id ? (
									<button
										onClick={handleSave}
										className="bg-green-500 text-white px-4 py-2 rounded">
										Save
									</button>
								) : (
									<>
										<button
											onClick={() => handleEdit(item)}
											className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
											Edit
										</button>
										<button
											onClick={() => handleDelete(item._id)}
											className="bg-red-500 text-white px-4 py-2 rounded">
											Delete
										</button>
									</>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AdminPage;
