module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/bees',
    migrations: {
      directory: './API/db/migrations'
    },
    seeds: {
      directory: './API/db/seeds/development'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/bees_test',
    migrations: {
      directory: './API/db/migrations'
    },
    seeds: {
      directory: './API/db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    /* eslint-disable-next-line */
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './API/db/migrations'
    },
    seeds: {
      directory: './API/db/seeds/test'
    },
    useNullAsDefault: true
  }
};