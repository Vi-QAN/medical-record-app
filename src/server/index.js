import login from './routes/login';
import register from './routes/register';

const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const app = express();



const PORT = process.env.PORT || 5000;

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

// app.post('/login',login);
app.post('/register/:role',register);
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
    }))
// ).then(
//     // new Doctor({
//     //     email: 'doctor@gmail.com',
//     //     password: 'admin',
//     // }).save().then("Doctor added"),
//     // new Patient({
//     //     email: 'patient@gmail.com',
//     //     password: 'admin'
//     // }).save().then("Patient added")
// )
.catch(err => {
    console.log('Can not connect to the database'+ err)
});