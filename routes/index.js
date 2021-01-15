const express = require('express');

const router = express.Router();

const { Pool, Client } = require('pg');

require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

/* GET home page. */
router.get('/', function (req, res, next) {
  try {
    const sql = `select * from kind_of_food`;

    pool.connect(async (err, client, done) => {
      if (err)
        return next(err);

      await client.query(sql, (err, result) => {
        if (err)
          return next(err);

        const sql_res = result.rows;

        let menu = [];

        sql_res.forEach(e => {
          menu.push(e.name.trim());
        });
        client.end();
        return res.render('index',
          {
            title: 'Express',
            menu: menu,
          }
        );
      });
    });

  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;
