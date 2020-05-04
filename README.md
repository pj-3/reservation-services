# Relaxly Reservation Module

> A reservation module that allows users to select dates to reserve for a stay at a location in the Relaxly app.

## Related Projects

  - https://github.com/Relax-ly/Header-images
  - https://github.com/Relax-ly/reviews-service
  - https://github.com/Relax-ly/related-homes

## Table of Contents

1. [Usage](#Usage)
1. [Endpoints](#Endpoints)

### Installing Dependencies

From within the root directory:

```sh
npm install
```
## Usage
### To Run App - Once Dependencies Installed

All occurs from within the root directory:

-go to reservation-services/db/index.js to change mysql password

Create mysql tables
```sh
mysql -u root -p < ./db/schema.sql
```
Seed your database with seeding script:

```sh
npm run seed
```
Build react app with script:

```sh
npm run react-dev
```
Run server:

```sh
npm run server-dev
```
Go to url http://localhost:3000/ to view app

## Endpoints

### CREATE

Post check in/check out dates, price, and guest info for specific home.
```sh
POST location/:id/reservations
```

#### Sample Request
```sh
{
"id": 1
"checkin_date": "2020-01-03T08:00:00.000Z"
"checkout_date": "2020-01-19T08:00:00.000Z"
"adults": 4
"children": 0
"infants": 1
"price": 1152
"locationId": 1
}
```


### READ

Get rate, review average, total reviews, service fee, and occupancy tax for specific home.
```sh
GET /location/:id
```

#### Sample Response
```sh
{
"id": 1
"rate": 72
"review_avg": 3.39
"total_review": 143
"service_fee": 8
"occupancy_tax": 7
}
```


Get check in/check out dates, price, and guest info for specific home.
```sh
GET location/:id/reservations
```

#### Sample Response
```sh
{
"id": 1
"checkin_date": "2020-01-03T08:00:00.000Z"
"checkout_date": "2020-01-19T08:00:00.000Z"
"adults": 4
"children": 0
"infants": 1
"price": 1152
"locationId": 1
}
```

### UPDATE

Update check in/check out dates, price, and guest info for specific home.
```sh
PUT location/:id/reservations/:id
```

Only fields requested will be updated. Price will be updated to reflect changes.
#### Sample Request
```sh
{
"id": 1
"checkin_date": "2020-01-03T08:00:00.000Z"
"checkout_date": "2020-01-19T08:00:00.000Z"
"locationId": 1
}
```

#### Sample Response
```sh
{
"id": 1
"checkin_date": "2020-01-03T08:00:00.000Z"
"checkout_date": "2020-01-19T08:00:00.000Z"
"adults": 4
"children": 0
"infants": 1
"price": 1152
"locationId": 1
}
```

### DELETE

Delete check in/check out dates, price, and guest info for specific home.
```sh
DELETE location/:id/reservations/:id
```

#### Sample Request
```sh
{
"id": 1
"locationId": 1
}
```