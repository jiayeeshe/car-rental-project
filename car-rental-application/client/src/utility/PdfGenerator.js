import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; // Import the fonts

pdfMake.vfs = pdfFonts.pdfMake.vfs; // Set the fonts

export const generatePDF = (req) => {
    const {car, startDate, endDate, totalDay, totalFare} = req;
    console.log(req);
    console.log(car);
  if (!car || !startDate || !endDate) {
    alert("Booking details are incomplete.");
    return;
  }

  const documentDefinition = {
    content: [
      // Title Page
      {
        text: 'Car Booking Confirmation',
        style: 'title',
        alignment: 'center',
        margin: [0, 100, 0, 50],
      },
      {
        text: `Booking Details`,
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 20],
      },
      {
        columns: [
          {
            width: '*',
            text: `Car Name: ${car.name}`,
            style: 'content',
          },
          {
            width: '*',
            text: `Rent Per Hour: $${car.rentPerHour}`,
            style: 'content',
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        columns: [
          {
            width: '*',
            text: `Start Date: ${startDate.toDateString()}`,
            style: 'content',
          },
          {
            width: '*',
            text: `End Date: ${endDate.toDateString()}`,
            style: 'content',
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        columns: [
          {
            width: '*',
            text: `Total Days: ${totalDay}`,
            style: 'content',
          },
          {
            width: '*',
            text: `Total Fare: $${totalFare}`,
            style: 'content',
          },
        ],
        margin: [0, 0, 0, 20],
      },
      {
        text: 'Thank you for booking with us!',
        style: 'footer',
        alignment: 'center',
        margin: [0, 50, 0, 0],
      },
    ],
    styles: {
      title: {
        fontSize: 24,
        bold: true,
        color: '#4A90E2',
      },
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      content: {
        fontSize: 14,
        margin: [0, 5],
        alignment: 'center',
        color: '#333',
      },
      footer: {
        fontSize: 14,
        italics: true,
        color: '#555',
      },
    },
  };
  pdfMake.createPdf(documentDefinition).download('booking_confirmation.pdf');
};
