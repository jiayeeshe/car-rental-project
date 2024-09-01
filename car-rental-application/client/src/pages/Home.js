// import React, { useState } from 'react'
// import DefaultLayout from '../components/DefaultLayout'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllCars } from '../redux/state/Car/carSlice';
// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';


// export const Home = () => {
//   const {cars} = useSelector(state=>state.cars);
//   const dispatch = useDispatch();
//   const [search, setSearch] = useState('');
//   const [minPrice, setMinPrice] = useState(0); // Default minimum price
//   const [maxPrice, setMaxPrice] = useState(Infinity); // Default maximum price

//   console.log(search);
//   useEffect(() => {
//     dispatch(getAllCars());
//   }, [])

//   return (
//     <DefaultLayout>
//       <div className="container">
//       <div className="row" style={{height:'30px', width:"auto"}}>
//         <div className='d-flex justify-content-center justify-content-lg-center justify-content-md-center justify-content-sm-center'>
//           <input className="col-lg-8 col-md-10 col-sm-10 col-xs-10" style={{width: '50%'}} placeholder="SEARCH.." onInput={(event)=>{setSearch(event.target.value)}}></input>
//         </div>
//       </div>
//       <div class="row">
//         {cars
//         .filter((car)=>{return search.toLowerCase === '' ? car : car.name.toLowerCase().includes(search)})
//         .map((car) => {
//           return <div class="d-flex  col-lg-4 col-md-6 col-sm-12 col-xs-12  justify-content-center justify-content-lg-between justify-content-md-evenly justify-content-sm-center align-items-lg-center">
//             <div className='shadow'>
//               <img src={car.image} className='carimg'/>
//               <div className='car-content d-flex'>
//                 <div>
//                   <p> {car.name}</p>
//                   <p> Rent Per Hour: {car.rentPerHour}</p>
//                 </div>
//                 <div className='d-flex align-content-center'>
//                   <button className='btn border-black m-4'><Link to={`/booking/${car._id}`}>Book Now</Link></button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         })}
//       </div>
//       </div>
//     </DefaultLayout>
//   )
// }
import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../redux/state/Car/carSlice';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { cars } = useSelector(state => state.cars);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(0); // Default minimum price
  const [maxPrice, setMaxPrice] = useState(Infinity); // Default maximum price

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <DefaultLayout>
      <div className="container">
        {/* Search and Price Filter Inputs */}
        <div className="row" style={{ height: '30px', width: "auto" }}>
          <div className='d-flex justify-content-center'>
            <input
              className="col-lg-8 col-md-10 col-sm-10 col-xs-10"
              style={{ width: '50%' }}
              placeholder="SEARCH.."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="row" style={{ height: '30px', width: "auto", marginTop: '10px' }}>
          <div className='d-flex justify-content-center'>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice === 0 ? '' : minPrice}
              onChange={(event) => setMinPrice(parseFloat(event.target.value) || 0)}
              style={{ width: '23%', marginRight: '2%' }}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice === Infinity ? '' : maxPrice}
              onChange={(event) => setMaxPrice(parseFloat(event.target.value) || Infinity)}
              style={{ width: '23%' }}
            />
          </div>
        </div>
        <div className="row">
          {cars
            .filter((car) => {
              const nameMatch = search.toLowerCase() === '' || car.name.toLowerCase().includes(search.toLowerCase());
              const priceMatch = (minPrice <= car.rentPerHour) && (car.rentPerHour <= maxPrice);

              return nameMatch && priceMatch;
            })
            .map((car) => (
              <div
                key={car._id}
                className="d-flex col-lg-4 col-md-6 col-sm-12 col-xs-12 justify-content-center justify-content-lg-between justify-content-md-evenly justify-content-sm-center align-items-lg-center"
              >
                <div className='shadow'>
                  <img src={car.image} className='carimg' alt={car.name} />
                  <div className='car-content d-flex'>
                    <div>
                      <p>{car.name}</p>
                      <p>Rent Per Day: ${car.rentPerHour}</p>
                    </div>
                    <div className='d-flex align-content-center'>
                      <button className='btn border-black m-4'>
                        <Link to={`/booking/${car._id}`}>Book Now</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </DefaultLayout>
  );
};
