const DoctorRegister  = require('./routes/DoctorRegister');
const Appointment = require('./routes/Appointment');
const Login = require('./routes/Login');
const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const cors = require('cors');
const app = express();

dotenv.config();

const PORT = process.env.PORT;

const corsOptions = {
    origin: "http://localhost:3000"
}

const Doctor = db.doctor;
const Patient = db.patient;

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

// appointment management
// add appointment
app.post('/doctor/:id/appointment/:appointmentID',Login.verifyUser,Appointment.addAppointment)

// update appointment
app.put('/doctor/:id/appointment/:appointmentID', Login.verifyUser, Appointment.updateAppointment);

// delete appointment
app.delete('/doctor/:id/appointment/:appointmentID',)

// app.get('/', function(req, res) {
//     res.send('hello');
// });




db.mongoose.connect(db.connection, { 
  useNewUrlParser: true,
  useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') }
).then(
  app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
  })
)
  
  // new Patient({
  //     email: 'patient@gmail.com',
  //     password: 'admin'
  // }).save().then("Patient added")
  .catch(err => {
    console.log("Error starting server");
    console.log(err);
  }
).catch(err => {
  console.log('Can not connect to the database'+ err)
});