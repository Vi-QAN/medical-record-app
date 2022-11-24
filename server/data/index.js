const { populateAppointment } = require('./AppointmentData');
const { populateDoctor} = require('./DoctorData');
const { populatePatient} = require('./PatientData');
const { populateRegistrationRequest } = require('./RegistrationRequestData');

const AppointmentData = populateAppointment();
const DoctorData = populateDoctor();
const PatientData = populateDoctor();
const RegistrationRequestData = populateRegistrationRequest();

module.exports = {
    AppointmentData,
    DoctorData,
    PatientData,
    RegistrationRequestData
}

