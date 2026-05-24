const express = require('express');
const router = express.Router();
const pool = require('../db');

// Все услуги
router.get('/list', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM "Услуга"');
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Оказанные услуги
router.get('/provided', async (req, res) => {
	try {
		const result = await pool.query(`
      SELECT o.*, u."Название", k."ФИО" as клиент, s."ФИО" as сотрудник
      FROM "Оказание_услуги" o
      JOIN "Услуга" u ON o."Услуга_idУслуга" = u."idУслуга"
      JOIN "Клиенты" k ON o."Клиенты_idКлиенты" = k."idКлиенты"
      JOIN "Сотрудники" s ON o."Сотрудники_idСотрудники" = s."idСотрудники"
    `);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Добавить услугу клиенту
router.post('/provide', async (req, res) => {
	const { Услуга_idУслуга, Сотрудники_idСотрудники, Клиенты_idКлиенты } =
		req.body;
	try {
		const result = await pool.query(
			'INSERT INTO "Оказание_услуги" ("Услуга_idУслуга", "Сотрудники_idСотрудники", "Клиенты_idКлиенты") VALUES ($1, $2, $3) RETURNING *',
			[Услуга_idУслуга, Сотрудники_idСотрудники, Клиенты_idКлиенты],
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
