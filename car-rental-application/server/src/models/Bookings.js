const mongoose = require('mongoose');


const BookingSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cars',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
    },

    bookedTimeSlots: [
        {
            from: {
                type: Date,
            },
            to: {
                type: Date,
            },
        }
       ],
    totalDay: {
        type: Number,
    },
    totalFare: {type : Number},
    
    // Array of time slots with 'from' and 'to' as date object
}, { timestamps: true }); // Enables Mongoose's automatic 'createdAt' and 'updatedAt' fields


const BookingModel = mongoose.model('bookings', BookingSchema);

module.exports = BookingModel;