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
const bodyParser = require('body-parser')

// image upload setup
var fs = require('fs');
var path = require('path');
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
const Image = db.image;

// base url for doctor 
const doctorBaseURL = '/doctor/:id';

// base url for patient
const patientBaseURL = '/patient/:id';

app.use(cors(corsOptions));

///////////////////////////////////
//image upload setup 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Set EJS as templating engine 
app.set("view engine", "ejs");
var multer = require('multer');
// storage
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
      cb(null, 'uploads/')
  }
});
var upload = multer({ storage: storage });

app.post(patientBaseURL + '/image', upload.single('image'), (req, res, next) => {
  console.log(req.body);
  const update = {
    image: {
      data: fs.readFileSync(req.file.path),
      contentType: 'image/png', 
    }
  }

  Image.updateOne({_id: req.params.id}, update, {upsert: true, setDefaultsOnInsert: true}, function(err){
    if (err) throw err;
  });
  // var new_img = new Image;
  // new_img._id = req.params.id;
  // new_img.image.data = fs.readFileSync(req.file.path)
  // new_img.image.contentType = 'image/png';  // or 'image/png'
  // new_img.save();
  res.json({ message: 'New image added to the db!' });
});
app.get(patientBaseURL + '/image', (req, res) => {
  Image.findOne({_id: req.params.id}, 'image createdAt', function(err, img) {
    if (err)
        res.send(err);
    res.contentType('json');
    res.send(img);
}).sort({ createdAt: 'desc' });
});

/////////////////////////////////////////

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

// get available appointments
app.get(patientBaseURL + '/appointments/available',AppointmentController.getAvailableAppointments);

// cancel appointment by patient id
app.put(patientBaseURL + '/appointment/:id' + '/cancel',Login.verifyToken,AppointmentController.cancelAppointment);
app.put(patientBaseURL + '/appointment/:id' + '/book',Login.verifyToken,AppointmentController.bookAppointment);

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