const express = require('express');
const router = express.Router();
const pool = require('../db');

// Все номера
router.get('/', async (req, res) => {
	try {
		const result = await pool.query(
			'SELECT * FROM "Номера" ORDER BY "Числовой_номер"',
		);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Свободные номера
router.get('/free', async (req, res) => {
	try {
		const result = await pool.query(`
      SELECT * FROM "Номера" 
      WHERE "idНомера" NOT IN (
        SELECT "Номера_idНомера" FROM "Заселение_клиента" WHERE "Статус" = 'Заселён'
      )
      ORDER BY "Числовой_номер"
    `);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Создать номер
router.post('/', async (req, res) => {
	const {
		Числовой_номер,
		Тип_номера,
		Количество_спальных_мест,
		Наличие_балкона,
		Цена,
	} = req.body;
	try {
		const result = await pool.query(
			'INSERT INTO "Номера" ("Числовой_номер", "Тип_номера", "Количество_спальных_мест", "Наличие_балкона", "Цена") VALUES ($1,$2,$3,$4,$5) RETURNING *',
			[
				Числовой_номер,
				Тип_номера,
				Количество_спальных_мест,
				Наличие_балкона,
				Цена,
			],
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
