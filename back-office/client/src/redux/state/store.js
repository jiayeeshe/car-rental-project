import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './Car/carSlice';
import adminsReducer from './User/adminSlice';

// import { alertsReducer } from './redux/state/Alert/alertSlice';


const store = configureStore({
  reducer: {
    cars: carsReducer,
    admins: adminsReducer,
  },
  });

export default store;