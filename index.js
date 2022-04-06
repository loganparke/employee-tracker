const fetch = require('node-fetch');
const inquirer = require('inquirer');

const menu = () => {
	return inquirer.prompt([
		{
			type: 'list',
			name: 'action',
			message: 'What would you like to do?',
			choices: ['See all Departments.', 'See all Jobs.', 'See all Employees.', 'Add a Department.', 'Add a Job.', 'Add an Employee.', 'Give Employee a new Job.', 'END']
		}
	])
  .then(ans => {
    chooseFetch(ans.action);
  });
};

const chooseFetch = action => {
  switch(action) {
    case 'See all Departments.':
      fetchDepartments();
      break;
    case 'See all Jobs.':
      fetchJobs();
      break;
    case 'See all Employees.':
      fetchEmployees();
      break;
    case 'Add a Department.':
      addDepartments();
      break;
    case 'Add a Job.':
      addJob();
      break;
    case 'Add an Employee.':
      addEmployee();
      break;
    case 'Give Employee a new Job.':
      editEmployee();
      break;
      case 'END':
      console.log('Goodbye!');
      break;
  }
}

//display all
const fetchDepartments = () => {
  console.log('fetch departments');
  fetch('http://localhost:3001/api/departments', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(function(response){
    response.json().then(function(data){
      console.log(data.data);
      console.table(data.data);
      menu();
    })
  });

};
const fetchJobs = () => {
  console.log('fetch jobs');
  fetch('http://localhost:3001/api/job', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(function(response){
    response.json().then(function(data){
      console.table(data.data);
      menu();
    })
  });
};
const fetchEmployees = () => {
  console.log('fetch employees');
  fetch('http://localhost:3001/api/employees', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(function(response){
    response.json().then(function(data){
      console.table(data.data);
      menu();
    })
  });
};

//add to 
const addDepartments = () => {
  return inquirer.prompt([
		{
			type: 'input',
			name: 'departmentName',
			message: 'What is the name of the new department?'
		}
	])
  .then(ans => {
    fetch(`http://localhost:3001/api/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ans),
    })
    menu();
  });
};

const addJob = () => {
  return inquirer.prompt([
		{
			type: 'input',
			name: 'jobName',
			message: 'What is the name of the new job?'
		},
    {
			type: 'input',
			name: 'salary',
			message: 'What is the salary of the new job?'
		},
    {
			type: 'input',
			name: 'jobDepartment',
			message: 'What is the department id# of the new job?'
		}
	])
  .then(ans => {
    fetch(`http://localhost:3001/api/job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ans),
    });
    menu();
  });
};

const addEmployee = () => {
  return inquirer.prompt([
    {
			type: 'input',
			name: 'firstName',
			message: 'What is the first name of the new Employee?'
		},
    {
			type: 'input',
			name: 'lastName',
			message: 'What is the last name of the new Employee?'
		},
    {
			type: 'input',
			name: 'jobId',
			message: 'What is the job id# of the new Employee?'
		},
    {
			type: 'input',
			name: 'managerId',
			message: 'What is the manager id# of the new Employee?'
		}
	])
  .then(ans => {
    fetch(`http://localhost:3001/api/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ans)
    })
    menu();
  });
};

const editEmployee = () => {
  return inquirer.prompt([
    {
			type: 'input',
			name: 'id',
			message: 'What is the Employees id# ?'
		},
    {
			type: 'input',
			name: 'jobId',
			message: 'What is the Employees new job id# ?'
		}
	])
  .then(ans => {
    fetch(`http://localhost:3001/api/employees/${ans.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ans)
    })
    menu();
  });
}
menu();