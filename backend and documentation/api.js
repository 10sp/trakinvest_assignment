const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ems',
    password: 'shivper',
    port: 5432,
  })

  const getEmployeeById = (request, response) => {
    const id = parseInt(request.params.id)
  
    
    pool.query('SELECT employee.id, employee.empname,employee.age,dept.depname FROM employee JOIN dept ON employee.deptid=dept.id WHERE employee.id = $1', [id],(error, results) => { 
      if (error) {
        console.log(error);
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  const getEmployees = (request, response) => {
    pool.query('SELECT employee.id, employee.empname,employee.age,dept.depname FROM employee JOIN dept ON employee.deptid=dept.id',(error, results) => { 
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }
  const getDepartment= (request, response) => {
    pool.query('SELECT * FROM dept',(error, results) => { 
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }
  
    const createEmployee = (request, response) => {
        const { empname, age,depId } = request.body
        console.log(request.body)
        pool.query('INSERT INTO employee (empname, age, deptid) VALUES ($1, $2,$3)', [empname, age, depId], (error, results) => {
          if (error) {
            throw error
          }
          console.log(results.fields);
          var responseText = {
            status:200,
            data:empname
          }
          response.status(200).send(responseText )
        })
      }


      const updateEmployee = (request, response) => {
        const id = parseInt(request.params.id)
        const { empname, age, depid } = request.body
        pool.query(
          `UPDATE employee SET empname = '${empname}', age = ${age},deptid=${depid} WHERE id = ${id}`,
        (error, results) => {
          if (error) {
            throw error
          }
          var responseText = {
            status:200,
            data:id
          }
          response.status(200).send(responseText )
        }
      )        
      }

      const deleteEmployee = (request, response) => {
        const id = parseInt(request.params.id)
      
        pool.query('DELETE FROM employee WHERE id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          var responseText = {
            status:200,
            data:id
          }
          response.status(200).send(responseText )
        })
      }

      
module.exports = {
    getEmployees
    ,createEmployee
    ,getEmployeeById
    ,updateEmployee
    ,deleteEmployee
    ,getDepartment
}    