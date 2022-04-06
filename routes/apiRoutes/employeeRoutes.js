const e = require('express');
const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/employees', (req, res) => {
  const sql = `SELECT e.id AS id, CONCAT(e.first_name, ' ', e.last_name) AS name, job.title AS job_title, CONCAT(m.first_name, ' ' ,m.last_name) AS manager FROM employee e LEFT JOIN job ON e.job_id = job.id LEFT JOIN employee m ON m.id = e.manager_id;`;

  // SELECT e.id AS id, 
  // CONCAT(e.first_name, ' ', e.last_name) AS name, 
  // job.title AS job_title, 
  // CONCAT(m.first_name, ' ' ,m.last_name) AS manager 
  // FROM employee e 
  // LEFT JOIN job 
  // ON e.job_id = job.id 
  // LEFT JOIN employee m ON m.id = e.manager_id;
  
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

router.put('/employees/:id', (req, res) => {
  const sql = `UPDATE employee SET job_id = ? WHERE id = ?`;
  const params = [req.body.jobId, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'employee not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

router.post('/employees', ({ body }, res) => {
  const sql = `INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES (?,?,?,?)`;
  const params = [
    body.firstName,
    body.lastName,
    body.jobId,
    body.managerId
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

router.delete('/employees/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'employee not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

module.exports = router;

// SELECT employee.id AS id, 
// CONCAT(first_name, ' ', last_name) AS name, 
// job.title AS job_title 
// FROM employee 
// LEFT JOIN job 
// ON employee.job_id = job.id;

// SELECT e.*, 
// CONCAT(m.first_name, ' ', m.last_name) AS mangager 
// FROM employee e 
// LEFT JOIN employee m 
// ON e.manager_id = m.id;


// SELECT employee.id AS id, 
// CONCAT(first_name, ' ', last_name) AS name, 
// CONCAT(m.first_name, ' ', m.last_name) AS mangager 
// FROM employee e 
// LEFT JOIN employee m 
// ON e.manager_id = m.id, 
// job.title AS job_title 
// FROM employee 
// LEFT JOIN job 
// ON employee.job_id = job.id;