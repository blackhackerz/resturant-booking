import React from "react";

interface Slot {
	time: string;
	available: boolean;
}

interface AvailabilityDisplayProps {
	availableSlots: Slot[];
	onSelectSlot: (slot: Slot) => void;
}

const AvailabilityDisplay: React.FC<AvailabilityDisplayProps> = ({
	availableSlots,
	onSelectSlot,
}) => {
	return (
		<div className="mt-4">
			<h3 className="font-bold text-lg">Available Time Slots:</h3>
			<div className="grid grid-cols-4 gap-4 mt-2">
				{availableSlots.map((slot, index) => (
					<button
						key={index}
						onClick={() => onSelectSlot(slot)}
						disabled={!slot.available}
						className={`py-2 px-4 rounded text-center ${
							slot.available
								? "bg-green-500 text-white hover:bg-green-600"
								: "bg-gray-300 text-gray-600 cursor-not-allowed"
						}`}>
						{slot.time}
					</button>
				))}
			</div>
		</div>
	);
};

export default AvailabilityDisplay;
