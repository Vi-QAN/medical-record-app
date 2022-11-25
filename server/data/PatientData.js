const populatePatient = () => {
    const emails = ['frockwill0@blinklist.com','jgrieg1@csmonitor.com','daizlewood2@163.com',
    'cgligoraci3@salon.com','kliquorish4@comsenz.com','akendell5@ca.gov','llundy6@sciencedaily.com',
    'odimmne7@google.co.uk','rdewis8@ed.gov','rendrizzi9@t-online.de','karonowicz0@ucla.edu','dpavic1@unicef.org',
    'acato2@miibeian.gov.cn','rleabeater3@google.com.br','loduilleain4@npr.org','scouch5@4shared.com',
    'fstockton6@wunderground.com','sheeran7@rediff.com','mbartot8@mashable.com','wgricks9@feedburner.com',
    'vskidmorea@admin.ch','cpreshawb@desdev.cn','pduffreec@list-manage.com','mspencerd@theguardian.com',
    'alakeye@51.la','gbaldacchif@shop-pro.jp','sfairneyg@google.pl','lluckmanh@usnews.com','bpiddlehintoni@ft.com'
    ]
    
    const names = ['Flem Rockwill','Judy Grieg','Donovan Aizlewood','Caitrin Gligoraci','Kirstyn Liquorish',
    'Anatole Kendell','Lorry Lundy','Ogdon Dimmne','Rodge Dewis','Raff Endrizzi','Kellen Aronowicz','Delphine Pavic',
    'Addia Cato', 'Reeba Leabeater', "Leonanie O'Duilleain", 'Sher Couch', 'Fairfax Stockton', 'Shir Heeran',
    'Mack Bartot','Web Gricks','Valli Skidmore','Cecelia Preshaw','Philippe Duffree','Matthew Spencer','Adolphe Lakey',
    'Gertrud Baldacchi','Skelly Fairney','Lee Luckman','Boniface Piddlehinton',
    ]

    const DOBs = ['2/28/2001','2/4/2001','2/11/2001','12/18/2000','7/22/2001','4/28/2001','7/13/2001',
    '11/22/2001','8/5/2001','11/7/2001','9/28/1999','11/16/2007','2/16/1996','05/04/1996','06/11/2006','04/09/2000',
    '3/24/2003','4/23/2000','1/24/2004','7/21/1992','05/07/1991','10/14/1998','12/11/1994','2/19/2000','6/26/2002',
    '02/01/1995','06/08/1996','7/31/1997','06/05/1992',
    ]

    const addresses = ['0 Drewry Drive','46353 Garrison Point','99305 Florence Place','63811 Lake View Way','959 Sutteridge Place',
    '9421 Rutledge Alley','3737 Schmedeman Way','2404 Dapin Park','03 Lukken Court','68 Summerview Street',
    '0 Cottonwood Avenue','4 Northfield Crossing','96 Pierstorff Court','4 Elgar Pass','618 Gale Lane','8 Maywood Hill',
    '95 Gulseth Avenue','44217 Esker Road','70419 Anniversary Terrace','9866 Garrison Way','53 Trailsway Terrace',
    '62 Hanson Parkway','10875 Hoard Terrace','7208 Nova Park','0 Coolidge Lane','9865 Truax Drive','83 Clemons Junction',
    '456 Continental Road','16517 Northport Alley'
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