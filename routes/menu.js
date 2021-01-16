const express = require('express');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const pool = req.app.get('pool');
        const sql = `select name, store_name from foods where kind_of_id = ${id}`;
        await pool.connect(async (err, client, done) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            client.query(sql, (err, results) => {
                const rows = results.rows;
                let foods = [];

                rows.forEach(e => {
                    foods.push({
                        name: e.name.trim(),
                        storeName: e.store_name.trim()
                    });
                });

                client.end();

                return res.render('index', {
                    page: 'menu',
                    title: 'Matna',
                    foods
                });
            });

        });
    } catch (err) {
        console.log('hi');
        console.error(err);
        return next(err);
    }
});

module.exports = router;