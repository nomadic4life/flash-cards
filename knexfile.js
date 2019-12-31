// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://postgres:pgpassword@localhost/db_flash_cards",
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds/dev"
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true
  },

  test: {
    client: "pg",
    connection: "postgress://localhost/test",
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds/test"
    },
    useNullAsDefault: true
  },

  staging: {
    client: "pg",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds/production"
    },
    useNullAsDefault: true
  }
};

// const obj = {
//   connection: {
//     host: "localhost",
//     port: 5432,
//     user: "nomadic",
//     // password: "pass",
//     database: "db_flash_cards"
//   }
// };

// const connection = "postgres://user:pass@localhost:5432/db_flash_cards";
// postgres://localhost
