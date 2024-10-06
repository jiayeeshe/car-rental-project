import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import emptyImage from '../data/images/emptyimage.png';
import {
    handleCapacityChange,
    handleRentPerDayChange,
    handleNameChange,
    handleImageChange,
} from '../utilities/carHandleInsertChange'; // Adjust the path as needed
import { insertNewCar } from '../redux/state/Admin/adminSlice';

export const Insert = () => {
    const [carImage, setCarImage] = useState('');
    const [carName, setCarName] = useState('');
    const [carRentPerDay, setCarRentPerDay] = useState(0);
    const [carCapacity, setCarCapacity] = useState(0);
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.admins);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Example: Retrieve values
        const name = formData.get('name'); // Get value of input with name="name"
        const carRentPerDay = formData.get('rent'); // Get value of input with name="name"
        const capacity = formData.get('capacity'); // Get value of input with name="name"
        const fuelType = formData.get('fuelType'); // Get value of input with name="email"

        const request = {
            image: carImage,
            name: name,
            rentPerDay: carRentPerDay,
            capacity: capacity,
            fuelType: fuelType,
        };

        console.log('request:', request);

        const response = await dispatch(insertNewCar(request));
        console.log(response);
        if (response) {
            alert('Inserted Succesfully!');
        }
    };

    useEffect(() => {
        console.log(carName);
    }, [carName]);

    return (
        <div>
            <DefaultLayout>
                <div className="container">
                    <div className="row d-flex d-lg-flex d-md-flex d-sm-flex justify-content-center justify-content-lg-center justify-content-md-center justify-content-sm-center align-items-lg-center align-items-md-center ">
                        <div className="d-flex d-lg-flex d-md-flex d-sm-flex col-10 col-lg-8 col-md-8 col-sm-10 col-xs-10 justify-content-center justify-content-lg-center justify-content-md-center justify-content-sm-center align-items-lg-center align-items-md-center ">
                            <div
                                className="container-lg container-md container-sm container shadow"
                                style={{ maxWidth: '100%' }}
                            >
                                <div
                                    className="d-lg-flex d-md-flex d-sm-flex d-flex justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center m-auto m-lg-auto m-md-auto m-sm-auto"
                                    style={{ maxWidth: '100%' }}
                                >
                                    <img
                                        src={carImage ? carImage : emptyImage}
                                        className="carimg"
                                    />
                                </div>
                                <div
                                    className="row d-lg-flex d-md-flex d-sm-flex d-flex justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center"
                                    style={{ maxWidth: '100%' }}
                                >
                                    <div className="row col-lg-12 col-md-12 col-sm-12 col-12 d-lg-flex d-md-flex d-sm-flex d-flex justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <input
                                                    accept="image/*"
                                                    type="file"
                                                    name="image"
                                                    className="form-control"
                                                    id="image"
                                                    required
                                                    onChange={(e) => {
                                                        handleImageChange(
                                                            e,
                                                            setCarImage
                                                        );
                                                    }}
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
                                                    name="name"
                                                    className="form-control"
                                                    id="carName"
                                                    placeholder="Insert Car Name"
                                                    required
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
                                                    name="fuelType"
                                                    className="form-control"
                                                    id="fuelType"
                                                    placeholder="fuel type"
                                                    required
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="text"
                                                    className="form-label"
                                                >
                                                    capacity
                                                </label>
                                                <input
                                                    type="number"
                                                    name="capacity"
                                                    className="form-control"
                                                    id="capacity"
                                                    placeholder="Number?"
                                                    required
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="text"
                                                    className="form-label"
                                                >
                                                    Rent Per Day
                                                </label>
                                                <input
                                                    type="number"
                                                    name="rent"
                                                    className="form-control"
                                                    id="rentPerDay"
                                                    required
                                                    placeholder="$$$$"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-100"
                                                    disabled={admin.isLoading}
                                                >
                                                    {admin.isLoading
                                                        ? 'Inserting..'
                                                        : 'Insert'}
                                                </button>
                                                {/* <p className='text-danger text-center'>{admin.error && admin.error.message}</p> */}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </div>
    );
};
