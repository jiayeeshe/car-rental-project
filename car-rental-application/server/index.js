const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const carRoutes = require('./src/routes/carRoutes');
const userRoutes = require('./src/routes/userRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
require('dotenv').config();
const mongoUri = process.env.MONGODB_URI
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

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

mongoose.connect(`${mongoUri}`,
  {useNewUrlParser: true}
);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port PORT`);
});