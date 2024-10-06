const BookingModel = require("../models/Bookings");
const carController = require("./carControllers");
const emptyVariable = "emptyVariable";
const bookCar = async (res, req) => {
    try {
        const user_id = req.user.id;
        const role = req.user.role;
        console.log(`id ${user_id}, role ${role}`);
        if (user_id && role) {
            if (role === "User") {
                if (req.body) {
                    const bookingreq = { ...req.body, user: user_id };
                    const newbooking = new BookingModel(bookingreq);
                    await newbooking.save();
                } else {
                    return res
                        .status(400)
                        .json("your booking request body is problematic");
                }

                // return res.send("Your booking is success");
            }
        } else {
            return res.status(400).json("User invalid");
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.bookAndUpdateCar = async (req, res) => {
    try {
        if (req) {
            const { car, bookedTimeSlots } = req.body;
            await bookCar(req);
            console.log(
                `car_id from booking: ${car}, bookingtime:${bookedTimeSlots}`
            );
            const updatedcar = await carController.updateCarTimeSlot(
                car,
                bookedTimeSlots
            );
            if (updatedcar) return res.status(200).json("book successfully");
        } else {
            return res.status(400).json("the request body is empty");
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};
