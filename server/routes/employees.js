const express = require('express');
const router = express.Router();
const pool = require('../db');

// Получить всех сотрудников
router.get('/', async (req, res) => {
	try {
		const result = await pool.query(
			'SELECT * FROM "Сотрудники" ORDER BY "idСотрудники" DESC',
		);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Получить сотрудника по ID
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const result = await pool.query(
			'SELECT * FROM "Сотрудники" WHERE "idСотрудники" = $1',
			[id],
		);
		if (result.rows.length === 0)
			return res.status(404).json({ message: 'Сотрудник не найден' });
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Создать сотрудника
router.post('/', async (req, res) => {
	const { ФИО, Паспорт, Должность } = req.body;
	try {
		const result = await pool.query(
			'INSERT INTO "Сотрудники" ("ФИО", "Паспорт", "Должность") VALUES ($1, $2, $3) RETURNING *',
			[ФИО, Паспорт, Должность],
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Обновить сотрудника
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { ФИО, Паспорт, Должность } = req.body;
	try {
		const result = await pool.query(
			'UPDATE "Сотрудники" SET "ФИО" = $1, "Паспорт" = $2, "Должность" = $3 WHERE "idСотрудники" = $4 RETURNING *',
			[ФИО, Паспорт, Должность, id],
		);
		if (result.rows.length === 0)
			return res.status(404).json({ message: 'Сотрудник не найден' });
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Удалить сотрудника
router.delete('/:id', async (req, res) => {
	try {
		await pool.query('DELETE FROM "Сотрудники" WHERE "idСотрудники" = $1', [
			req.params.id,
		]);
		res.json({ message: 'Сотрудник удалён' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
