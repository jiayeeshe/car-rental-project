import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../redux/state/Car/carSlice';
import { Link, useNavigate } from 'react-router-dom';

export const Home = () => {
    const { cars } = useSelector((state) => state.cars);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState(0); // Default minimum price
    const [maxPrice, setMaxPrice] = useState(Infinity); // Default maximum price
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch]);

    const handleSubmit = async (e, carId) => {
        navigate(`/booking/${carId}`);
    };

    return (
        <DefaultLayout>
            <div className="container">
                {/* Search and Price Filter Inputs */}
                <div className="row" style={{ height: '30px', width: 'auto' }}>
                    <div className="d-flex justify-content-center">
                        <input
                            className="col-lg-8 col-md-10 col-sm-10 col-xs-10"
                            style={{ width: '50%' }}
                            placeholder="SEARCH.."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                </div>
                <div
                    className="row"
                    style={{ height: '30px', width: 'auto', marginTop: '10px' }}
                >
                    <div className="d-flex justify-content-center">
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice === 0 ? '' : minPrice}
                            onChange={(event) =>
                                setMinPrice(parseFloat(event.target.value) || 0)
                            }
                            style={{ width: '23%', marginRight: '2%' }}
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice === Infinity ? '' : maxPrice}
                            onChange={(event) =>
                                setMaxPrice(
                                    parseFloat(event.target.value) || Infinity
                                )
                            }
                            style={{ width: '23%' }}
                        />
                    </div>
                </div>
                <div className="row">
                    {cars
                        .filter((car) => {
                            const nameMatch =
                                search.toLowerCase() === '' ||
                                car.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase());
                            const priceMatch =
                                minPrice <= car.rentPerDay &&
                                car.rentPerDay <= maxPrice;

                            return nameMatch && priceMatch;
                        })
                        .map((car) => (
                            <div
                                key={car._id}
                                className="d-flex col-lg-4 col-md-6 col-sm-12 col-xs-12 justify-content-center justify-content-lg-between justify-content-md-evenly justify-content-sm-center align-items-lg-center"
                            >
                                <div
                                    className="container-lg container-md container-sm container shadow"
                                    style={{ maxWidth: '100%' }}
                                >
                                    <div
                                        className="d-lg-flex d-md-flex d-sm-flex d-flex justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center"
                                        style={{ maxWidth: '100%' }}
                                    >
                                        <img
                                            src={car.image}
                                            className="carimg"
                                            alt={car.name}
                                        />
                                    </div>
                                    <div
                                        className="row d-lg-flex d-md-flex d-sm-flex d-flex justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center"
                                        style={{ maxWidth: '100%' }}
                                    >
                                        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 d-lg-flex d-md-flex d-sm-flex d-flex justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center">
                                            <form
                                                onSubmit={(e) =>
                                                    handleSubmit(e, car._id)
                                                }
                                            >
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="text"
                                                        className="form-label"
                                                    >
                                                        Car
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="carName"
                                                        value={car.name}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="number"
                                                        className="form-label"
                                                    >
                                                        Rent Per Day
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="rent"
                                                        value={car.rentPerDay}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="number"
                                                        className="form-label"
                                                    >
                                                        capacity
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="carName"
                                                        value={car.capacity}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary w-100"
                                                    >
                                                        {/* {admin.isLoading ? "Loading..." : "login"}  disabled={admin.isLoading}*/}
                                                        Book Now!
                                                    </button>
                                                    {/* <p className='text-danger text-center'>{admin.error && admin.error.message}</p> */}
                                                </div>
                                            </form>
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
