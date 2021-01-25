const express = require('express');

const router = express.Router();

router.get('/:menuId', async (req, res, next) => {
    try {
        const id = req.params.menuId;
        const pool = req.app.get('pool');
        const sql = `select food_id, name, store_name from foods where kind_of_id = ${id}`;
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
                        foodId: e.food_id,
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
        console.error(err);
        return next(err);
    }
});

router.post('/:menuId/:foodId', async (req, res, next) => {
    try {
        const id = req.params.foodId;
        const pool = req.app.get('pool');

        const comments_sql = `select u.username as username, c.contents as contents,
		                        c.create_date as createdate, c.comment_like as like, c.comment_hate as hate
                                from food_comments c
	                            left outer join users u on u.user_id = c.user_id
                                where c.food_id = ${id}
                                order by c.create_date;`;
        const score_sql = `select coalesce(sum(s.score), 0) as totalscore, 
		                    coalesce(count(s.score), 0) as countscore
                            from food_scores s, foods f
                            where s.food_id = f.food_id`;
        await pool.connect(async (err, client, done) => {
            if (err) {
                console.error(err);
                return next(err);
            }

            const comments_res = await client.query(comments_sql);
            const score_res = await client.query(score_sql);

            const c_rows = comments_res.rows;
            const s_rows = score_res.rows;

            res.json({
                comments: c_rows,
                score: s_rows
            });

            client.end();
        });

    } catch (err) {
        console.error(err);
        return next(err);
    }
});

module.exports = router;