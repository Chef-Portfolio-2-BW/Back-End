// Update with your config settings
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
    client: 'sqlite3',
    useNullAsDefault: true,
    connection:{
      filename: './test.db3'
    }
  }

};
