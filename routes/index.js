const express = require('express');

const router = express.Router();

require('dotenv').config();

/* GET home page. */
router.get('/', function (req, res, next) {
  try {
    const pool = req.app.get('pool');
    const sql = `select * from kind_of_food`;

    pool.connect(async (err, client, done) => {
      if (err)
        return next(err);

      await client.query(sql, (err, result) => {
        if (err)
          return next(err);

        const sql_res = result.rows;

        let menu = [];
        let menu_index = [];
        sql_res.forEach(e => {
          menu_index.push(e.kind_of_id);
          menu.push(e.name.trim());
        });
        client.end();
        return res.render('index',
          {
            page: 'main',
            title: 'Matna',
            index: menu_index,
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
