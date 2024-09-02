const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const carRoutes = require('./src/routes/carRoutes');
const userRoutes = require('./src/routes/userRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const allowedOrigins = ['http://localhost:3002', 'http://localhost:3000']

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(require('cookie-parser')()); // To parse cookies
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes)
app.use('/api/admins', adminRoutes);


mongoose.connect("mongodb+srv://shejiayee:Shejiayi921*@car-rental-app.032kv.mongodb.net/car-rental-app",
  {useNewUrlParser: true}
);




// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port PORT`);
});