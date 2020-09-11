# Node.js-Auth-JWT-
Node.js Auth with jwt and MySQL DB

To start work with this application you need to do a few steps:

- yarn install || npm install

- create db and 3 tables there : 
  1. For users;
  2. For blocked tokens; 
  3. For uploaded files.
  
- change env db variables in package.json to connect to your mysql server:
    "env": {
       "MYSQL_HOST": "localhost",
       "MYSQL_USER": "root",
       "MYSQL_PASSWORD": "",
       "MYSQL_DB": "test"
     }
  
- change env db variables in .env file according to your table names:
    FILES_TABLE_DB='files'
    USERS_TABLE_DB='users'
    BLOCKED_TOKENS_DB='blocked_tokens'
