const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/job', (req, res) => {
  const sql = `SELECT job.id, job.title, salary, department.name AS department_name FROM job LEFT JOIN department ON job.department_id = department.id;`;
  
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

router.post('/job', ({ body }, res) => {
  const sql = `INSERT INTO job (title, salary, department_id) VALUES (?,?,?)`;
  const params = [
    body.jobName,
    body.salary,
    body.jobDepartment
  ];

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