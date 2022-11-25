const uuid = require('uuid');

const populateRegistrationRequest = () => {
    const data = []

    
    for (let i = 11; i < 30; i++){
        const id = Math.floor(Math.random() * 5) + 1;
        const request = {
            _id: uuid.v1(),
            to: "D" + id,
            from: "P" + i,
            date: new Date(),
            accepted: false,
        }
        data.push(request);
    }
    return data;
}

module.exports = {
    populateRegistrationRequest
}

