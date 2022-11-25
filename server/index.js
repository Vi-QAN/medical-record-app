const DoctorController  = require('./routes/Doctor');
const AppointmentController = require('./routes/Appointment');
const PatientController = require('./routes/Patient');
const RequestController = require('./routes/Request');
const Login = require('./routes/Login');
const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const cors = require('cors');
const app = express();
const data = require('./data/index');
const { patient } = require('./config/db');

dotenv.config();

// server port
const PORT = process.env.PORT;

// cross origin
const corsOptions = {
    origin: "http://localhost:3000"
}

// get models for database insertion
const Doctor = db.doctor;
const Patient = db.patient;
const Appointment = db.appoinment;
const RegistrationRequest = db.registrationRequest;

// base url for doctor 
const doctorBaseURL = '/doctor/:id';

// base url for patient
const patientBaseURL = '/patient/:id';

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

app.post('/register/doctor',[DoctorController.validateEmail, DoctorController.validateRegistration],DoctorController.saveDoctor)

// login from modal
app.post('/login',Login.verifyUser,Login.saveUser);

// login using url
app.post('/auth',Login.verifyToken)

// appointment management API
// add appointment
app.post(doctorBaseURL + '/appointments',Login.verifyToken,AppointmentController.addAppointment);

// update appointment
app.put(doctorBaseURL + '/appointment/:appointmentID', Login.verifyToken, AppointmentController.updateAppointment);

// delete appointment
app.delete(doctorBaseURL + '/appointment/:appointmentID',Login.verifyToken, AppointmentController.deleteAppointment);

// get appointment by doctor id
app.get(doctorBaseURL + '/appointments', AppointmentController.getAppointmentsByDoctor);

// get appointment by patient id
app.get(patientBaseURL + '/appointments',AppointmentController.getAppointmentsByPatient);

// cancel appointment by patient id
app.put(patientBaseURL + '/appointment/:id' + '/cancel',Login.verifyToken,AppointmentController.cancelAppointment);

// get patient list by doctor id
app.get(doctorBaseURL + '/patients', DoctorController.getPatientList);

// update patient list
app.put(doctorBaseURL + '/patients', DoctorController.updatePatientList);

// get request list by doctor id
app.get(doctorBaseURL + '/requests',DoctorController.getRequestList);

// delete request
app.delete('/request/:requestID',RequestController.deleteRequest);

// get patient info
app.get(patientBaseURL, PatientController.getPatientInfo);

// update patient info
app.put(patientBaseURL, Login.verifyToken, PatientController.updatePatientInfo)






db.mongoose.connect(db.connection, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Database is connected')   
  // populate database
  Doctor.count().then((count) => {
    if (count === 0){
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