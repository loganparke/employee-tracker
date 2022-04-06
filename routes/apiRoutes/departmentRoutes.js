const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/departments', (req, res) => {
  const sql = `SELECT id, name FROM department;`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

router.post('/departments', ({ body }, res) => {
  if (!body) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO department (name) VALUES (?)`;
  const params = body.departmentName;

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
      changes: result.affectedRows
    });
  });
});

module.exports = router;