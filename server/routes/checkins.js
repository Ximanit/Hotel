const express = require('express');
const router = express.Router();
const pool = require('../db');

// Все заселения
router.get('/', async (req, res) => {
	try {
		const result = await pool.query(`
      SELECT z.*, 
             k."ФИО" as клиент_фио,
             n."Числовой_номер" as номер,
             s."ФИО" as сотрудник_фио
      FROM "Заселение_клиента" z
      JOIN "Клиенты" k ON z."Клиенты_idКлиенты" = k."idКлиенты"
      JOIN "Номера" n ON z."Номера_idНомера" = n."idНомера"
      JOIN "Сотрудники" s ON z."Сотрудники_idСотрудники" = s."idСотрудники"
      ORDER BY z."Дата_заселения" DESC
    `);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Заселить клиента
router.post('/', async (req, res) => {
	const {
		Сотрудники_idСотрудники,
		Номера_idНомера,
		Клиенты_idКлиенты,
		Дата_заселения,
		Дата_выезда,
		Количество_персон,
		Стоимость,
		Колчиество_дней,
		Статус = 'Заселён',
	} = req.body;

	try {
		const result = await pool.query(
			`
      INSERT INTO "Заселение_клиента" 
      ("Сотрудники_idСотрудники", "Номера_idНомера", "Клиенты_idКлиенты", 
       "Дата_заселения", "Дата_выезда", "Количество_персон", "Стоимость", 
       "Колчиество_дней", "Статус")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *
    `,
			[
				Сотрудники_idСотрудники,
				Номера_idНомера,
				Клиенты_idКлиенты,
				Дата_заселения,
				Дата_выезда,
				Количество_персон,
				Стоимость,
				Колчиество_дней,
				Статус,
			],
		);

		res.status(201).json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Выселить (изменить статус)
router.put('/:id/checkout', async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query(
			'UPDATE "Заселение_клиента" SET "Статус" = $1 WHERE "idЗаселение_клиента" = $2 RETURNING *',
			['Выселен', id],
		);
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
