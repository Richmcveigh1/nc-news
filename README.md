# NC News API

Northcoders (NC) News API is a project built for the purpose of emulating a server in the real world.

## Installation

Install NC-News

1. Ensure that you have installed:

* [Node.JS](https://nodejs.org/en)
* [Postgres.js](https://www.postgresql.org/)

2. Fork and clone the repo
3. Open the repo and install the dependencies by running:

```
npm install
```

**optional**

4. In order to run the tests install the following dev dependencies:
``` 
npm install -D jest jest-sorted supertest
```
5. Run tests:
```
npm test
```

### Create two .env files in Project Root directory

Create a file called .env.development containing 
```
PGDATABASE=nc_news
```
Create a file called .env.test containing 
```
PGDATABASE=nc_news_test
```

### Seed database
```
npm run setup-dbs
npm run seed
```
