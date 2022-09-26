const express = require('express');
const dotenv = require('dotenv');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const app = express();
//const routes = require('routes');
//const customerRoute = require('./routes/customer')

dotenv.config({path: '.env-local'});

const PORT = process.env.PORT || '3001';

//
// const swaggerOptions = {
//     swaggerDefinition :{
//         info:{
//             title:"Agent API",
//             description:"Agent API Information",
//             contact : {
//                 name : "Nikhil Mandge (nmandge@uncc.edu)"
//             },
//             servers:[`http://localhost:${PORT}`]

//         }
//     },
//     //
//     apis:["./routes/*.js"]

// };


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument));

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({extended:false}));

/**
 * Routes
 */



app.get('/', (request, response) => {
   response.status(200).send("Welcome to nmandge@uncc.edu REST API, use routes customers, agent, student, company")
})

//const userRouter = require('./routes/user');
//app.use('/user',userRouter);


// Routes

const customerRouter = require('../routes/customer');

app.use('/customer',customerRouter);
//app.use('/customer',routes.customer);

const agentRouter = require('../routes/agent');
app.use('/agent',agentRouter);

const companyRouter = require('../routes/company');
app.use('/company',companyRouter);

const studentRouter = require('../routes/student');
app.use('/student',studentRouter);


/**Start listening */
app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})
