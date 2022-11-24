const populatePatient = () => {
    const emails = ['frockwill0@blinklist.com','jgrieg1@csmonitor.com','daizlewood2@163.com',
    'cgligoraci3@salon.com','kliquorish4@comsenz.com','akendell5@ca.gov','llundy6@sciencedaily.com',
    'odimmne7@google.co.uk','rdewis8@ed.gov','rendrizzi9@t-online.de'
    ]
    const names = ['Flem Rockwill','Judy Grieg','Donovan Aizlewood','Caitrin Gligoraci','Kirstyn Liquorish',
    'Anatole Kendell','Lorry Lundy','Ogdon Dimmne','Rodge Dewis','Raff Endrizzi'
    ]

    const DOBs = ['2/28/2001','2/4/2001','2/11/2001','12/18/2000','7/22/2001','4/28/2001','7/13/2001',
    '11/22/2001','8/5/2001','11/7/2001'
    ]

    const addresses = ['0 Drewry Drive','46353 Garrison Point','99305 Florence Place','63811 Lake View Way','959 Sutteridge Place',
    '9421 Rutledge Alley','3737 Schmedeman Way','2404 Dapin Park','03 Lukken Court','68 Summerview Street'
    ]	

    const data = []

    for (let i = 1; i <= emails.length;i++){
        const index = i - 1;
        const patient = {
            _id: "P" + i,
            email: emails[index],
            password: "12345",
            name: names[index],
            DOB: new Date(DOBs[index]),
            gender: (i % 2) === 0 ? 'Male' : 'Female',
            address: addresses[index],
        }
        data.push(patient);
    }
    return data;
}

module.exports = {
    populatePatient
}