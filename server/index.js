const DoctorRegister  = require('./routes/DoctorRegister');
const AppointmentController = require('./routes/Appointment');
const Login = require('./routes/Login');
const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const cors = require('cors');
const app = express();
const data = require('./data/index');

dotenv.config();

const PORT = process.env.PORT;

const corsOptions = {
    origin: "http://localhost:3000"
}

const Doctor = db.doctor;
const Patient = db.patient;
const Appointment = db.appoinment;
const RegistrationRequest = db.registrationRequest;

app.use(cors(corsOptions));
app.use(express.json());

app.get("/doctors", async (req, res) => {
    const doctors = await Doctor.find({});
    try {
      res.send(doctors);
    } catch (error) {
      res.status(500).send(error);
    }
  });

app.post('/register/doctor',[DoctorRegister.validateEmail, DoctorRegister.validateRegistration],DoctorRegister.saveDoctor)

// login from modal
app.post('/login',Login.verifyUser,Login.saveUser);

// login using url
app.post('/auth',Login.verifyToken)

// appointment management API
// add appointment
app.post('/doctor/:id/appointments',Login.verifyToken,AppointmentController.addAppointment);

// update appointment
app.put('/doctor/:id/appointment/:appointmentID', Login.verifyToken, AppointmentController.updateAppointment);

// delete appointment
app.delete('/doctor/:id/appointment/:appointmentID',Login.verifyToken, AppointmentController.deleteAppointment);

// get appointment by id
app.get('/doctor/:id/appointments', AppointmentController.getAppointmentsByDoctor);

// app.get('/', function(req, res) {
//     res.send('hello');
// });




db.mongoose.connect(db.connection, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Database is connected')   
  // populate database
  Doctor.count().then((count) => {
    if (count === 0) {
      Doctor.insertMany(data.DoctorData).then(() => console.log('Doctors added')).catch(err => console.log(err));
    }
  })
  Patient.count().then((count) => {
    if (count === 0){
      Patient.insertMany(data.PatientData).then(() => console.log('Patients added')).catch(err => console.log(err));
    }
  })
  Appointment.count().then((count) => {
    if (count === 0){
      Appointment.insertMany(data.AppointmentData).then(() => console.log('Appointments added')).catch(err => console.log(err));
    }
  })
  RegistrationRequest.count().then((count) =>{
    if (count === 0){
      RegistrationRequest.insertMany(data.RegistrationRequestData).then(() => console.log('Registration Requests added')).catch(err => console.log(err));
    }
  })
}).then(
  app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
  })
).catch(err => {
    console.log("Error starting server");
    console.log(err);
  }
).catch(err => {
  console.log('Can not connect to the database'+ err)
});