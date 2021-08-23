const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const api = require('./api');
var cors = require('cors');

 app.use(cors());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// app.get('/', (request, response) => {
//     // res.setHeader('Access-Control-Allow-Origin', '*');
//     // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//     // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//     //res.setHeader('Access-Control-Allow-Credentials', true); // If needed

//     // res.send('cors problem fixed:)');
//   })

app.get('/employees', api.getEmployees)
app.get('/employees/:id', api.getEmployeeById)
app.post('/employees', api.createEmployee)
app.put('/employees/:id', api.updateEmployee)
app.delete('/employees/:id', api.deleteEmployee)
app.get('/departments',api.getDepartment)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})  