import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../redux/state/Car/carSlice';
import { Link } from 'react-router-dom';
import {
    handleCapacityChange,
    handleRentPerDayChange,
    handleNameChange,
    handleImageChange,
} from '../utilities/carHandleUpdateChange'; // Adjust the path as needed
import { updateCarDetails } from '../redux/state/Admin/adminSlice';

export const Update = () => {
    const { admin } = useSelector((state) => state.admins);
    const { cars } = useSelector((state) => state.cars);
    const [updateIsLoading, setUpdateIsLoading] = useState({});
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState(0); // Default minimum price
    const [maxPrice, setMaxPrice] = useState(Infinity); // Default maximum price
    const [newCarImage, setNewImage] = useState({});
    const [originalCarInfo, setOriginalCarInfo] = useState({});

    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch]);

    useEffect(() => {
        const normalizedCarInfo = cars.reduce((acc, car) => {
            acc[car._id] = car;
            return acc;
        }, {});

        // Initialize the car data and original data
        setOriginalCarInfo(normalizedCarInfo);
    }, [cars]);

    const handleSubmit = async (e, car) => {
        e.preventDefault();
        setUpdateIsLoading({ [car._id]: true });
        let carId = car._id;
        const formData = new FormData(e.target);
        let name = '';
        let carRentPerDay = 0;
        let capacity = 0;
        let fuelType = '';
        // Example: Retrieve values
        !formData.get('name')
            ? (name = car.name)
            : (name = formData.get('name'));
        !formData.get('rent')
            ? (carRentPerDay = car.rentPerDay)
            : (carRentPerDay = formData.get('rent'));
        !formData.get('capacity')
            ? (capacity = car.capacity)
            : (capacity = formData.get('capacity'));
        !formData.get('fuelType')
            ? (fuelType = car.fuelType)
            : (fuelType = formData.get('fuelType'));

        console.log(
            `name: ${name}, rent: ${carRentPerDay}, capacity: ${capacity}`
        );

        const currentCarInfo = {
            name: name,
            rentPerDay: carRentPerDay,
            capacity: capacity,
            image: newCarImage[carId],
            fuelType: fuelType,
        };

        // Compare current values with original values
        const modifiedFields = {};
        // const currentCarInfo = newCarInfo[carId];
        const originalCarInfoForId = originalCarInfo[carId];

        for (const key in currentCarInfo) {
            if (currentCarInfo[key] !== originalCarInfoForId[key]) {
                modifiedFields[key] = currentCarInfo[key];
            }
        }
        // Pass only modified fields
        console.log('Modified fields:', modifiedFields);

        const response = await dispatch(
            updateCarDetails({ carId, modifiedFields })
        );
        if (response) {
            alert('Updated Succesfully');
            setUpdateIsLoading({ [car._id]: false });
        }
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
                    {cars && cars.length > 0 ? (
                        cars
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
                                    className="d-flex d-lg-flex d-md-flex d-sm-flex col-lg-4 col-md-6 col-sm-12 col-xs-12 justify-content-center justify-content-lg-center justify-content-md-center justify-content-sm-center align-items-lg-center align-items-md-center"
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
                                                src={
                                                    (newCarImage &&
                                                        newCarImage[car._id]) ||
                                                    car.image
                                                }
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
                                                        handleSubmit(e, car)
                                                    }
                                                >
                                                    <div className="mb-3">
                                                        <input
                                                            accept="image/*"
                                                            type="file"
                                                            className="form-control"
                                                            name="image"
                                                            id="image"
                                                            // value=image
                                                            onChange={(e) =>
                                                                handleImageChange(
                                                                    e,
                                                                    car._id,
                                                                    setNewImage
                                                                )
                                                            }
                                                        />
                                                    </div>
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
                                                            name="name"
                                                            id="carName"
                                                            placeholder={
                                                                car.name
                                                            }
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="text"
                                                            className="form-label"
                                                        >
                                                            Fuel Type
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="fuelType"
                                                            id="fuelType"
                                                            placeholder={
                                                                car.fuelType
                                                            }
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
                                                            type="number"
                                                            className="form-control"
                                                            name="capacity"
                                                            id="capacity"
                                                            placeholder={
                                                                car.capacity
                                                            }
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
                                                            type="number"
                                                            className="form-control"
                                                            name="rent"
                                                            id="rent"
                                                            placeholder={
                                                                car.rentPerDay
                                                            }
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary w-100"
                                                            disabled={
                                                                updateIsLoading[
                                                                    car._id
                                                                ]
                                                            }
                                                        >
                                                            {updateIsLoading[
                                                                car._id
                                                            ]
                                                                ? 'Updating...'
                                                                : 'Update'}
                                                        </button>
                                                        {/* <p className='text-danger text-center'>{admin.error && admin.error.message}</p> */}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div>No cars available</div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
};
