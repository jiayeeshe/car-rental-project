export const handleCapacityChange = (e, carId, setNewCarInfo) => {
    const capacity = e.target.value;
    setNewCarInfo((prevState) => ({
        ...prevState,
        [carId]: {
            ...prevState[carId],
            capacity: capacity, //
        },
    }));
};

export const handleRentPerDayChange = (e, carId, setNewCarInfo) => {
    const rentPerDay = e.target.value;
    setNewCarInfo((prevState) => ({
        ...prevState,
        [carId]: {
            ...prevState[carId],
            rentPerDay: rentPerDay, //
        },
    }));
};

export const handleNameChange = (e, carId, setNewCarInfo) => {
    const name = e.target.value;
    setNewCarInfo((prevState) => ({
        ...prevState,
        [carId]: {
            ...prevState[carId],
            name: name, //
        },
    }));
};
export const handleImageChange = (e, carId, setNewImage) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        // Update the image for the specific car
        // setNewCarInfo(prevState => ({
        //   ...prevState,
        //   [carId]: {
        //     ...prevState[carId], // Contains name, fuelType, and other details
        //     image: reader.result // Update the image field with the Base64 string
        //   },
        // }));
        setNewImage({ [carId]: reader.result });
    };
    if (file) {
        reader.readAsDataURL(file);
    }
};
