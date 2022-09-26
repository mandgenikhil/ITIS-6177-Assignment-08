const {
    body
} = require('express-validator');



exports.validateAgent = [body('AGENT_CODE', 'AGENT_CODE of cannot be empty').notEmpty().trim().escape(),
body('AGENT_NAME', 'AGENT_NAME of cannot be empty').notEmpty().trim().escape(),
body('WORKING_AREA', 'WORKING_AREA of cannot be empty').notEmpty().trim().escape(),
body('COUNTRY', 'COUNTRY of cannot be empty').notEmpty().trim().escape(),
];

