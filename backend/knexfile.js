module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './affinghwangdb.sqlite',   
    },
    useNullAsDefault: true,  
    migrations: {
      directory: './migrations',  
    },
  },
};
