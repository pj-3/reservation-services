const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'ohjeezz',
  host: 'localhost',
  database: 'relaxly_pj3',
  password: '',
  port: 5432,
});

pool.query('SELECT 1 + 1 AS solution', (err, res) => {
  if (err) {
    console.log(err);
  }
  console.log('hi its pg13 and ITS CONNECTED PROBABLY HOPEFULLY MAYBE');
});

module.exports = pool;
