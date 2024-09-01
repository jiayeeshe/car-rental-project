const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
// const carRoutes = require('./src/routes/carRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

// Middleware
app.use(cors({
  origin: 'http://localhost:3002', // Allow this origin
  credentials: true // Allow credentials
}));
app.use(express.json());
app.use(require('cookie-parser')()); // To parse cookies
// app.use('/api/cars', carRoutes);
app.use('/api/admins', adminRoutes);
// app.use('/api/bookings', bookingRoutes)

mongoose.connect("mongodb+srv://shejiayee:Shejiayi921*@car-rental-app.032kv.mongodb.net/back-office",
  {useNewUrlParser: true}
);




// Start Server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port PORT`);
});