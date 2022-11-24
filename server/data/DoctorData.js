
const populateDoctor = () => {
    const names = ['Amandi Bradman','Dermot Rabl','Thom Clemson','Malissia Screen','Reamonn Starmont'];
    const emails = ['abradman0@ftc.gov','drabl1@apple.com','tclemson2@adobe.com','mscreen3@odnoklassniki.ru','rstarmont4@sfgate.com']
    
    const data = [];

    for (let i = 1; i <= names.length; i++){
        const index = i - 1;
        const doctor = {
            _id: "D" + i,
            email: emails[index],
            password: "12345" ,
            registration: i.toString(),
            name: names[index],
            practice: (i % 2 === 0) ? "In house" : "Out door"
        }
        data.push(doctor);
    }
    return data;
}

module.exports = {
    populateDoctor
}