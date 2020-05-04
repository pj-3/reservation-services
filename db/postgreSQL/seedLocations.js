const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cliProgress = require('cli-progress');

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const locationWriter = createCsvWriter({
  path: './data/locations.csv',
  header: [
    { id: 'location_id', title: 'location_id' },
    { id: 'location_address', title: 'location_address' },
    { id: 'rate', title: 'rate' },
    { id: 'review_avg', title: 'review_avg' },
    { id: 'total_review', title: 'total_review' },
    { id: 'service_fee', title: 'service_fee' },
    { id: 'occupancy_tax', title: 'occupancy_tax' },
  ]
});

const uniqueTotal = 10000;
let locationCount = 1;

const generateLocations = () => {
  const randRange = (min, max) => Math.floor((Math.random() * (max - min)) + min);
  const locations = [];

  for (let i = 0; i < uniqueTotal; i++) {
    const location_id = locationCount++;
    const location_address = faker.fake('{{address.streetAddress}}, {{address.city}}');
    const rate = randRange(20, 100);
    const review_avg = (Math.random() * 5).toFixed(2);
    const total_review = randRange(50, 500);
    const service_fee = randRange(5, 10);
    const occupancy_tax = randRange(1, 8);

    const location = {
      location_id,
      location_address,
      rate,
      review_avg,
      total_review,
      service_fee,
      occupancy_tax,
    };
    locations.push(location);
    bar.increment();
  }
  return locations;
};

const total = 1000;
let count = 0;

const writeLocations = () => {
  if (count < total) {
    const locations = generateLocations();
    locationWriter.writeRecords(locations)
      .then(() => {
        count++;
        writeLocations();
      })
      .catch(() => {
        console.log('cry, error in csv writing AS ALWAYS   (╯°□°）╯︵ ┻━┻');
      });
  } else {
    bar.stop();
    console.log('PLEASE BE FAST LIKE SPEED RACER  (╯°□°）╯︵ ┻━┻ ');
  }
};

bar.start(uniqueTotal * total, 0);
writeLocations();
