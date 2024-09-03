import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllCars } from '../redux/state/Car/carSlice'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import {generatePDF} from '../utility/PdfGenerator';


export const BookingCar = () => {
  const { cars, isLoading } = useSelector(state=>state.cars);
  const { carid } = useParams();
  const dispatch = useDispatch();
  const [car,setCar] = useState(null);
  const [startDate, setStartDate] = useState(null); // Default to today
  const [endDate, setEndDate] = useState(null);
  const [totalDay, setTotalDay] = useState(0);
  const [totalFare, setTotalFare] = useState(0); // State to store the calculated fare
  const [bookedDates, setBookedDates] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect( () => {

    if(cars.length===0){
    dispatch(getAllCars());
    }
    else{
        const selected_car = cars.find(o=> o._id ===carid)
        setCar(selected_car);
        if (selected_car && selected_car.bookedTimeSlots) {
          disableBookedDates(selected_car);
        }

      }
    }, [carid, cars, dispatch])



  const disableBookedDates = (car) => {
    const bookedTimeSlots = car.bookedTimeSlots;
    
    const dates = [];
    bookedTimeSlots.forEach(slot => {
      let current = new Date(slot.from);
      const end = new Date(slot.to);
      while (current <= end) {
        dates.push(new Date(current).toDateString());
        current.setDate(current.getDate() + 1);
      }
    });
    setBookedDates(dates);
  } 

  const isDateDisabled = (date) => {
    return bookedDates.includes(date.toDateString());
  };

  // Function to get the date for the next day
  const getNextDay = (date) => {
    if (!date) return null;
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  };

    // Handle start date change
    const handleStartDateChange = (date) => {
      setStartDate(date);
      // Automatically set endDate to the next day after the new start date
      if (date) {
        setEndDate(getNextDay(date));
      } else {
        setEndDate(null); // Clear end date if start date is cleared
      }
    };
  
    const bookNow = async () => {
      const reqObj = {
        car : car._id,
        totalDay,
        totalFare,
        bookedTimeSlots : {
          from : new Date(startDate.toISOString()),
          to: new Date(endDate.toISOString()),
        }
      }
      await bookCar(reqObj);
      console.log(`start date : ${startDate}`);
    }

    const bookCar = async (reqObj) => {
      try {
        console.log(reqObj);
        const response = await axios.post("http://localhost:3001/api/bookings/bookcar",reqObj);
        if(response){ 
          navigate('/bookingsuccess');
          const req = {
            car : car,
            startDate: startDate,
            endDate: endDate,
            totalDay: totalDay,
            totalFare: totalFare
          }
          generatePDF(req);
        }
      }
      catch (err){
        console.log(err)
      }
    }

     // Calculate the total fare when start or end date changes
  useEffect(() => {
    if (startDate && endDate && car) {
      // Calculate the difference in days
      const timeDiff = endDate.getTime() - startDate.getTime();
      const dayCount = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
      // Calculate the total fare
      const calculatedFare = dayCount * car.rentPerDay;
      setTotalDay(dayCount)
      setTotalFare(calculatedFare); // Set the total fare
    }
  }, [startDate, endDate, car]);

  return (
    <div>
      <DefaultLayout>
        {isLoading && (<div className='d-flex justify-content-lg-center justify-content-center justify-content-md-center justify-content-sm-center align-items-center align-items-lg-center'><Spinner/></div>)}
        { car &&
        <div className=''> 
        <div className="row d-lg-flex d-md-flex d-sm-flex">
          <div className="d-flex col-lg-10 col-md-10 col-sm-12 col-12  justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center align-content-lg-center align-content-md-center align-content-sm-center align-content-center"  style={{height:'25vh'}}>            
          <img alt="carimage" src={car.image} className='h-auto' style={{maxHeight: '100%', maxWidth: '100%'}}/>
          </div>
          <div className="col-lg-10 col-md-12 col-sm-12 col-12" style={{height:'25vh'}}>            
            <div className='text-capitalize text-center text-lg-center text-md-center text-sm-center' style={{maxHeight:"100%"}}>
              <hr className='my-lg-4 my-md-4 my-sm-4 my-4'></hr>
              <p>Car name : {car.name} </p>
              <p>Rent per day: ${car.rentPerDay}</p>
              <p>Fuel type : {car.fuelType}</p>
              <p>Max Persons :</p>
              <hr className='my-lg-4 my-md-4 my-sm-4 my-4'></hr>
              <div>


          <div className="">
            <div>{"select start date :"}</div>
            <div className='m-lg-auto border-1 border-black'>
              <DatePicker
                selected={startDate}
                onChange={(date) => handleStartDateChange(date)}
                minDate={new Date()} // Prevent selection of past dates
                maxDate={new Date().setFullYear(new Date().getFullYear() + 1)} // Set maximum selectable date
                dateFormat="MMMM d, yyyy"
                placeholderText="Select a start date"
                excludeDates={bookedDates.map(date => new Date(date))}
              />
            </div>
          </div >
          <div className="pb-lg-3 pb-md-3 pb-sm-3 pb-3">
            <div>{"select end date   :"}</div>
            <div className='m-lg-auto border-1 border-black'>
              <DatePicker
                 selected={endDate}
                 onChange={(date) => setEndDate(date)}
                 minDate={getNextDay(startDate)} // End date should be after the start date
                 dateFormat="MMMM d, yyyy"
                 placeholderText="Select an end date"
                 filterDate={date => !isDateDisabled(date)} // Disable dates in bookedDates
              />
            </div>
          </div >
          
          <div>
            <div className='pb-lg-5 pb-md-5 pb-sm-5 pb-5'>
               <hr className='my-lg-4 my-md-4 my-sm-4 my-4'></hr>
               <div>Fare calculation</div>
               <div>Total Days: {endDate && startDate ? Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) : 0}</div>
               <div>Rent per day: ${car.rentPerDay}</div>
               <div>Total Fare: ${totalFare}</div>
               <div className='mt-2 mt-lg-2 mt-md-2 mt-sm-2'>
                <button className='btn btn-success btn-lg' onClick={bookNow}> Pay now </button>
               </div>

            </div>

          </div>


              </div>
            <div/>
          </div>
        </div>
        </div>
        </div>
}
      </DefaultLayout>
    </div>
  )
}
