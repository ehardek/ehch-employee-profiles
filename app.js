const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const employees = []
// This section holds the question arrays for each 
function enQ (){
    inquirer.prompt([
   {
      type: "input",
      message: "What is the engineer's name?",
      name: "name"  
   },
   {
       type: "input",
       message: "What is the engineer's id number?",
       name: "id"  
    },
    {
       type: "input",
       message: "What is the engineer's email?",
       name:"email"   
    },
    {
        type:"input",
        message: "What is the engineer's github" ,
        name: "github"
    }
   ]).then(data=>{
       var engineer = new Engineer (data.name,data.id, data.email, data.school)
       employees.push(engineer);
       questions();
    })
 };
function mQ (){ 
   inquirer.prompt([
    {
       type: "input",
       message: "What is the  manager's name?",
       name: "name"  
    },
    {
        type: "input",
        message: "What is the  manager's id number?",
        name: "id"  
     },
     {
        type: "input",
        message: "What is the  manager's email?",
        name:"email"   
     },
     {
         type:"input",
         message: "What is the manager's office number?" ,
         name: "officeNumber"
     }
]).then (data=>{
   var manager = new Manager (data.name,data.id, data.email, data.school)
   employees.push(manager);
   questions();
})
};
function iQ(){ 
   inquirer.prompt([
       {
           type: "input",
           message: "What is the intern's name?",
           name: "name"  
        },
        {
            type: "input",
            message: "What is the intern's id number?",
            name: "id"  
         },
         {
            type: "input",
            message: "What is the intern's email?",
            name:"email"   
         },
         {
             type:"input",
             message: "What school did the intern attend?" ,
             name: "school"
         }
]).then(data=>{
   var intern = new Intern (data.name,data.id, data.email, data.school)
   employees.push(intern);
   questions()
})
};
// This is where I determine the role of the new employee 
   function questions(){
       inquirer.prompt([
          {
        type: "list",
        message:"What is the employee's role?",
        name:"role",
        choices:["Engineer","Intern","Manager" ,"I'm Done"]
       }]).then(data =>{ 
   switch (data.role) {
      case "Engineer":
         enQ();
      break;
      case "Intern":
         iQ ()
      break;   
      case "Manager":
         mQ();
      break;
      case "I'm Done":
         fs.writeFile(outputPath, render (employees), function (error){
            if (error){console.log (error)}
            else {console.log("Success")}
         })
      break;
   };
       })};
questions();

