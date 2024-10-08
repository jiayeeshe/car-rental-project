# Car Rental Application

## Overview

The Car Rental Application is a responsive web-based system designed to manage car rentals efficiently. It consists of a client-side application for users to browse and book cars and a server-side application to handle business logic and data management. The system uses Docker for containerization to ensure consistency and ease of deployment.

## Application Architecture

The architecture of the Car Rental Application is composed of three main services:

1. **Car Application Client**
   - **Description:** The front-end user interface where customers can view available cars, make bookings
   - **Technology:** Built using React.js, Bootstrap, Redux.

2. **Car Application Server**
   - **Description:** The back-end service that handles business logic, communicates with the database, and serves API requests from the client.
   - **Technology:** Built using Node.js with Express, MongoDB, JWT token 

3. **Backoffice Client**
   - **Description:** An administrative interface for managing car listings
   - **Technology:** Built using React.js, Bootstrap, Redux.

## Technologies Used

- **Frontend:**
  - **React.js**: For building user interfaces in both the car application client and backoffice client.
    - **Bootstrap**: For building a responsive website suited for each kind of devices
    - **Redux**: used to manage the application's state in a predictable and centralized way. It helps keep the state consistent across different components by providing a global store and making state changes more transparent and easier to debug through reducers 

- **Backend:**
  - **Node.js**: Server-side JavaScript runtime environment.
  - **Express.js**: Web framework for Node.js to handle API routes and server logic.
  - **JWT token:**: authorization for most of the requests made by the user/admin, make sure
  they have the rights to do it

- **Containerization:**
  - **Docker**: For containerizing the application services, ensuring consistent development and deployment environments.
- **Database:**
  - **MongoDB**: Hosted on cloud, use to store total 4 collections which are users, admins, bookings and cars.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. **Set Up Environment Variables:**
Create a .env file in each service directory (./car-rental-application/client, ./car-rental-application/server, and ./back-office/client) and add necessary environment variables.

3. **Build and Run Containers:**
   ```bash
    docker-compose up --build

This command builds the Docker images and starts the containers. The application services will be accessible at the following ports:

## Car Application Client: 
http://localhost:3000
## Backoffice Client: 
http://localhost:3001
## Car Application Server: 
http://localhost:5000


4. **Potential Improvements:**

### a. Add more functionalities for user such as view booking history, cancel booking...
### b. Add more functionalities for admin such as manage users and manage bookings
### c. Decorate the website layout with better bootstrap and css


## Super Admin Login Credentials

To access the super admin features, use the following credentials:

- **Username:** `admin1234`
- **Password:** `abcd1234`