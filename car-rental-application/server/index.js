const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const carRoutes = require('./src/routes/carRoutes');
const userRoutes = require('./src/routes/userRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow this origin
  credentials: true // Allow credentials
}));
app.use(express.json());
app.use(require('cookie-parser')()); // To parse cookies
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes)

mongoose.connect("mongodb+srv://shejiayee:Shejiayi921*@car-rental-app.032kv.mongodb.net/car-rental-app",
  {useNewUrlParser: true}
);




// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port PORT`);
});