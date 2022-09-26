const express = require('express');
const router = express.Router();
const pool = require('../helpers/databse');




router.get('/', async function(req,res){
    try {
        const sqlQuery = 'SELECT * FROM student;';
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
    //res.status(200).json({id:req.params.id})
});

module.exports = router;
