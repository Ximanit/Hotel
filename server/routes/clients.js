const express = require('express');
const router = express.Router();
const pool = require('../db');

// Получить всех клиентов
router.get('/', async (req, res) => {
	try {
		const result = await pool.query(
			'SELECT * FROM "Клиенты" ORDER BY "idКлиенты" DESC',
		);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Получить клиента по ID
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const result = await pool.query(
			'SELECT * FROM "Клиенты" WHERE "idКлиенты" = $1',
			[id],
		);
		if (result.rows.length === 0)
			return res.status(404).json({ message: 'Клиент не найден' });
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Создать клиента
router.post('/', async (req, res) => {
	const { ФИО, Паспорт, Дата_рождения } = req.body;
	try {
		const result = await pool.query(
			'INSERT INTO "Клиенты" ("ФИО", "Паспорт", "Дата_рождения") VALUES ($1, $2, $3) RETURNING *',
			[ФИО, Паспорт, Дата_рождения],
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Обновить клиента
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { ФИО, Паспорт, Дата_рождения } = req.body;
	try {
		const result = await pool.query(
			'UPDATE "Клиенты" SET "ФИО" = $1, "Паспорт" = $2, "Дата_рождения" = $3 WHERE "idКлиенты" = $4 RETURNING *',
			[ФИО, Паспорт, Дата_рождения, id],
		);
		if (result.rows.length === 0)
			return res.status(404).json({ message: 'Клиент не найден' });
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Удалить клиента
router.delete('/:id', async (req, res) => {
	try {
		await pool.query('DELETE FROM "Клиенты" WHERE "idКлиенты" = $1', [
			req.params.id,
		]);
		res.json({ message: 'Клиент удалён' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
