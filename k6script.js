import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 100 },
    { duration: '15s', target: 500 },
    { duration: '30s', target: 1000 },
  ],
};

const ranId = () => { return Math.floor(Math.random() * 10000000) + 1 };

export default function () {
  group('v1 API stress testing', function () {
    group('get location', function () {
      let res = http.get(`http://localhost:3000/${ranId}`);

      check(res, {
        'status is 200': r => r.status === 200,
        'transaction time under 2000s': r => r.timings.duration < 2000,
      });
    });

    group('get reservations @ location', function () {
      let res = http.get(`http://localhost:3000/${ranId}/reservations`);

      check(res, {
        'status is 200': r => r.status === 200,
        'transaction time under 2000s': r => r.timings.duration < 2000,
      });
    });

    // group('post resevation', function () {
    //   let url = `http://localhost:3000/${ranId}/reservations`;

    //   check(http.post(url, data), {
    //     'status is 200': r => r.status === 200,
    //     'transaction time under 2000s': r => r.timings.duration < 2000,
    //   });
    // });

  });
  sleep(1);
}
