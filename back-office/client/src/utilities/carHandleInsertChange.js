
export const handleImageChange = (e, setCarImage) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        // Update the image for the specific car
        setCarImage(reader.result // Update the image field with the Base64 string
        )
      };


    if (file) {
        reader.readAsDataURL(file);
      }
}

export const handleNameChange = (e, setCarName) => {
    setCarName(e.target.value);
}

export const handleRentPerDayChange = (e, setCarRentPerDay) => {
    setCarRentPerDay(e.target.value);
}

export const handleCapacityChange = (e, setCarCapacity) => {
    setCarCapacity(e.target.value);
}