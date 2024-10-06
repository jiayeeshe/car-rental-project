const CarModel = require("../models/Cars").default;

exports.getAllCars = async (req, res) => {
    const cars = await CarModel.find();
    if (!cars) return res.status(400).json({ error: "The query is empty" });
    else {
        return res.send(cars);
    }
};

exports.updateCarTimeSlot = async (carId, newTimeSlot) => {
    try {
        console.log(`car id: ${carId} and newtimeslot : ${newTimeSlot}`);
        // Update the carModel with the new booking time slot
        const updatedCar = await CarModel.findOneAndUpdate(
            { _id: carId },
            { $push: { bookedTimeSlots: newTimeSlot } }, // Assuming carModel has an array of booked time slots
            { new: true }
        );

        console.log("Car time slot updated:", updatedCar);
        return updatedCar;
    } catch (error) {
        console.error("Error updating car time slot: ", error);
        throw error;
    }
};
