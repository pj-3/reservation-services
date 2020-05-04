const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cliProgress = require('cli-progress');

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const reservationWriter = createCsvWriter({
  path: './data/reservations.csv',
  header: [
    { id: 'reservation_id', title: 'reservation_id' },
    { id: 'checkin_date', title: 'checkin_date' },
    { id: 'checkout_date', title: 'checkout_date' },
    { id: 'adults', title: 'adults' },
    { id: 'children', title: 'children' },
    { id: 'infants', title: 'infants' },
    { id: 'price', title: 'price' },
    { id: 'location_id', title: 'location_id' },
    { id: 'user_id', title: 'user_id' },

  ]
});

const userWriter = createCsvWriter({
  path: './data/users.csv',
  header: [
    { id: 'username', title: 'username' },
    { id: 'email', title: 'email' },

  ]
});

const uniqueTotal = 10000;
let resUseCount = 1;
let locationCount = 1;
let reservationCount = 1;

const generateReservationsAndUsers = () => {
  const randRange = (min, max) => Math.floor((Math.random() * (max - min)) + min);
  const reservations = [];
  const users = [];

  for (let i = 0; i < uniqueTotal; i++) {
    for (let j = 0; j < Math.floor((Math.random() * 5) + 5); j++) {
      const checkin_date = `2020-${j + 1}-${randRange(1, 14)}`;
      const checkout_date = `2020-${j + 1}-${randRange(15, 28)}`;
      const adults = randRange(1, 5);
      const children = randRange(0, 5);
      const infants = randRange(0, 5);
      const price = randRange(100, 2000);
      const username = faker.internet.userName();
      const email = faker.internet.email();

      const user = {
        username,
        email,
      };

      const reservation = {
        reservation_id: reservationCount,
        checkin_date,
        checkout_date,
        adults,
        children,
        infants,
        price,
        location_id: locationCount,
        user_id: resUseCount,
      };

      users.push(user);
      reservations.push(reservation);

      reservationCount++;
      resUseCount++;

    }
    locationCount++;
  }
  return [reservations, users];
};

const total = 1000;
let count = 0;
let data;

const writeReservations = () => {
  data = generateReservationsAndUsers();
  if (count < total) {
    reservationWriter.writeRecords(data[0])
      .then(() => {
        userWriter.writeRecords(data[1])
          .then(() => {
            count++;
            bar.increment();
            writeReservations();
          })
          .catch(() => {
            console.log('cry, error in csv writing AS ALWAYS   (╯°□°）╯︵ ┻━┻');
          });
      })
      .catch(() => {
        console.log('cry, error in csv writing AS ALWAYS  (╯°□°）╯︵ ┻━┻');
      });
  } else {
    bar.stop();
    console.log('I am crying too much T_T   (╯°□°）╯︵ ┻━┻ ');
  }
};

bar.start(total, 0);
writeReservations();

//csv writer

//native javascript

//could be writing a lot of times
//faker functions super expensive
//memory management
//overload harddisc if dont have space
// under an hour or two
// decrease amount of writing to file
// write in bulk
// increase speed
