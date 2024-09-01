import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './Car/carSlice';
import usersReducer from './User/userSlice';

// import { alertsReducer } from './redux/state/Alert/alertSlice';


const store = configureStore({
  reducer: {
    cars: carsReducer,
    users: usersReducer,
  },
  });

export default store;