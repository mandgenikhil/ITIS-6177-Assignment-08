const express = require('express');
const router = express.Router();
const pool = require("../helpers/databse");
const { body, validationResult } = require('express-validator');

const {
    validateAgent
} = require('../helpers/validator');

//const bcrypt = require('bcrypt');



/**
 * @swagger
 * /agent:
 *    get:
 *      description: Returns all agents
 *      responses:
 *          '200':
 *              description: Successfully returned all user
 *          '500':
 *              description: Failed to query for users
 */

router.get('/', async function(req,res){
    try {
        const sqlQuery = 'SELECT * FROM agents;';
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
});


/**
 * @swagger
 * /agent:
 *    post:
 *      summary: Use to insert a new user
 *      requestBody:
 *          description: Use to insert a new user
 *          content:
 *              application/json:
 *                  example:
 *                      AGENT_NAME:test
 *                      AGENT_EMAIL:test@test.com
 *                      WORK_AREA:Charlotte
 *              test/plain:
 *                  schema:
 *                      type:string
 *                  
 *      responses:
 *          '200':
 *              description: Successfully inserted a user
 *          '500':
 *              description: Failed to insert a user
 *          '400':
 *              description: Bad request body
 */

router.post('/',body('AGENT_NAME').notEmpty(),body('AGENT_EMAIL').notEmpty().isEmail(),
body('WORKING_AREA').isAlphanumeric().notEmpty(), async function(req,res){
    try {
        console.log(req.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
        const sqlQuery = `INSERT INTO agents (AGENT_NAME,AGENT_EMAIL, WORKING_AREA) VALUES ("${req.body.AGENT_NAME}","${req.body.AGENT_EMAIL}","${req.body.WORKING_AREA}");`;
        const rows = await pool.query(sqlQuery);
        res.status(200).json(req.body);
    } catch (error) {
        res.status(400).send(error.message)
    }
});




router.put('/',body('AGENT_NAME').notEmpty(),body('AGENT_EMAIL').notEmpty().isEmail(),
body('NEW_AGENT_EMAIL').notEmpty().isEmail(),
body('WORKING_AREA').isAlphanumeric().notEmpty(), async function(req,res){
    try {
            // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const sqlQuery = `UPDATE agents SET AGENT_NAME = "${req.body.AGENT_NAME}", WORKING_AREA = "${req.body.WORKING_AREA}" ,AGENT_EMAIL = "${req.body.NEW_AGENT_EMAIL}" WHERE  AGENT_EMAIL = "${req.body.AGENT_EMAIL}";`
    const rows = await pool.query(sqlQuery);

    res.status(200).json(`User ${req.body.AGENT_NAME} Successfully Updated`);
    } catch (error) {
        res.status(400).send(error.message)
    }
});



router.patch('/',body('AGENT_NAME').notEmpty(),body('AGENT_EMAIL').notEmpty().isEmail(),
body('WORKING_AREA').isAlphanumeric().notEmpty(), async function(req,res){
    try {
            // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const sqlQuery = `UPDATE agents SET AGENT_NAME = "${req.body.AGENT_NAME}", WORKING_AREA = "${req.body.WORKING_AREA}" WHERE  AGENT_EMAIL = "${req.body.AGENT_EMAIL}";`
    const rows = await pool.query(sqlQuery);

    res.status(200).json(`User ${req.body.AGENT_NAME} Successfully Updated`);
    } catch (error) {
        res.status(400).send(error.message)
    }
});


router.delete('/',body('AGENT_NAME').notEmpty(),body('AGENT_EMAIL').notEmpty().isEmail(), async function(req,res){
    try {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
        const sqlQuery = `DELETE FROM agents WHERE AGENT_NAME = "${req.body.AGENT_NAME}" and AGENT_EMAIL = "${req.body.AGENT_EMAIL}";`;
        await pool.query(sqlQuery);
        res.status(200).json(`User ${req.body.AGENT_NAME} Successfully Deleted`);
    } catch (error) {
        res.status(400).send(error.message)
    }
});


module.exports = router;
