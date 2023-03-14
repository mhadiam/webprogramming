const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "web",
  password: "M11111111h",
  port: 5432,
});
