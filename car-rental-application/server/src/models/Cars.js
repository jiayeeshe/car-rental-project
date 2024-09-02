const mongoose = require('mongoose');


const CarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String, 
        required: true, 
    },
    capacity: {
        type: Number,
        required: true,
    },
    fuelType: {
        type: String,
        required: true,
    },
    bookedTimeSlots:  [
        {
            from: {
                type: Date,
            },
            to: {
                type: Date,
            },
            _id: false,
        }
       ],
    rentPerDay: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the date when the car is added to the collection
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Automatically set the date when the car is updated
    }
}, { timestamps: true }); // Enables Mongoose's automatic 'createdAt' and 'updatedAt' fields


const CarModel = mongoose.model('cars', CarSchema);

module.exports = CarModel;