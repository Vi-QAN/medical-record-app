Project Structure

Server: Express application
    - config: 
        - Db.js: store configuration for database such as models, connection string. 
    - constant:
        - Constant.js: store constants used for server
    - data: populate data according to model
        - AppointmentData.js: 
        - DoctorData.js
        - PatientData.js
        - RegistrationRequest.js
        - index.js: entry of functions
    - models: schemas for mongodb collections
        - Appointment.js
        - Doctor.js
        - Image.js: store image of patients
        - RegistrationRequest.js
        - User.js
    - routes: asynchronous functions that handle api calls
        - Appointment.js
        - Doctor.js
        - Login.js
        - Patient.js
        - Request.js
        - index.js: configure express server, database connection, populate database, routing
src: React application
    - assets: store images used in application
    - components: 
        - DoctorScheduler.js: calendar component used in doctor page
        - Footer.js
        - Header.js
        - LoginModal.js: 
        - Modal.js
        - RegisterModal.js
        - ToggleDisplayBar.js: toggle section display	
    - constants: colors and base link for express server
    - pages: 
        AboutPage.js
        DoctorPage.js
        MainPage.js
        PatientPage.js

# Running Project

This project will need a mongodb instance running at first

create database name MedicalDatabase

Connection String: `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DB}?authSource=admin`;

Go to ./server/config/db.js 
Modify USERNAME, PASSWORD, HOST, PORT variables regarding to your mongodb instance

## Running Server

To run up express server: navigate to root folder 
Run command: npm run dev 

Express server will be run on port 5000 then connected to database
data for database will be populate automatically 

## Running React App
To run up react app: navigate to root folder
Run command: npm run start

You can now login for doctor using id D1 password 12345

Or patient using id P1 password 12345