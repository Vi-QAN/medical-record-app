const uuid = require('uuid');

const populateAppointment = () => {
    const titles = ["Heart Check","Health Check","Liver Check","Leg Check","Physical Therapy","Prescription"];

    const data = [];

    Date.prototype.addDays = function (days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
    }
    for (let z = 1; z <= 5; z++){
        for (let i = 0; i < 5; i++){
            for (let j = 0; j < 5;j++){
                const index = Math.floor(Math.random() * titles.length);
                const startDate = new Date().addDays(i).addHours(j);
                const endDate = new Date().addDays(i).addHours(j + 2);
                const appointment = {
                    _id: uuid.v1(),
                    createdBy: "D" + z,
                    startDate: startDate,
                    endDate: endDate,
                    state: (i % 2 === 0) ? 'Available' : 'Booked',
                    title: titles[index],
                }
                data.push(appointment);
            }      
        }
    }
    
    return data;
}

module.exports = {
    populateAppointment
}