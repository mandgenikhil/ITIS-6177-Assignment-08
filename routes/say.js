const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require("../helpers/databse");
const { body, validationResult } = require('express-validator');

const {
    validateAgent
} = require('../helpers/validator');


router.get('/', function (req, res) {
    try {
        axios.get('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-45ba06c0-f385-4da7-aa9c-3625f98e16c9/assignment09/say?keyword='+req.query.keyword)
            .then(function (response) {
                // handle success
                res.status(200).send(response.data);
            })
            .catch(function (error) {
                res.status(501).send(error.message)
            })

    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = router;
