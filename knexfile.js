// Update with your config settings
require('dotenv').config()
const dbConnection = process.env.DATABASE_URL
module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './recipes.db3'
    }
  },

  test:{
    client: 'sqlite3',
    useNullAsDefault: true,
    connection:{
      filename: './test.db3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'd39nff8qu8n880',
      user:     'jhhqkobuszdqit',
      password: '3a0572eef1d64e43240f86a5628931e605b808b45ba82232ef87bc816b304933'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
