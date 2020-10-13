const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { resolve } = require("path");
const { report } = require("process");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function promptManager(){
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Manager Name:"
        },
        {
            type: "input",
            name: "id",
            message: "Manager ID:",
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
              },
              
        },
        {
            type: "input",
            name: "email",
            message: "Manager Email:"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Manager Office Number:",
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
              },
        },
        {
            type: "list",
            name: "another",
            message: "Would you like to add an engineer or intern?",
            choices: ["Engineer","Intern","None"]
        }
    ])
}

function promptEngineer(){
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Engineer Name:"
        },
        {
            type: "input",
            name: "id",
            message: "Engineer ID:",
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
              },
        },
        {
            type: "input",
            name: "email",
            message: "Engineer Email:"
        },
        {
            type: "input",
            name: "github",
            message: "Engineer GitHub Name:"
        },
        {
            type: "list",
            name: "another",
            message: "Would you like to add another engineer or intern?",
            choices: ["Engineer","Intern","None"]
        }
    ])
}

function promptIntern(){
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Intern Name:"
        },
        {
            type: "input",
            name: "id",
            message: "Intern ID:",
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
              },
        },
        {
            type: "input",
            name: "email",
            message: "Intern Email:"
        },
        {
            type: "input",
            name: "school",
            message: "Intern School:"
        },
        {
            type: "list",
            name: "another",
            message: "Would you like to add another engineer or intern?",
            choices: ["Engineer","Intern","None"]
        }
    ])
}

const team = [];

function runEngineer(){
    promptEngineer().then(function(response){
        const engineer = new Engineer(response.name, response.id, response.email, response.github)
        if(response.another == "Engineer"){
            team.push(engineer);
            runEngineer();
        }else if(response.another == "Intern"){
            team.push(engineer);
            runIntern();
        }else if(response.another == "None"){
            team.push(engineer);
            
            
            fs.writeFile("./output/team.html", render(team),function(err){
                if(err) throw err;
                console.log("Writing team file...")
            });
            return;
        }
    })
}

function runIntern(){
    promptIntern().then(function(response){
       const intern = new Intern(response.name, response.id, response.email, response.school)
        if(response.another == "Engineer"){
            team.push(intern);
            runEngineer();
        }else if(response.another == "Intern"){
            team.push(intern);
            runIntern();
        }else if(response.another == "None"){
            team.push(intern);
            
            
            fs.writeFile("./output/team.html", render(team),function(err){
                if(err) throw err;
                console.log("Writing team file...")
            });
            return;
        }
    })
}

function runManager(){
    promptManager().then(function(response){
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber)

        if(response.another == "Engineer"){
            team.push(manager);
            runEngineer();
        }else if(response.another == "Intern"){
            team.push(manager);
            runIntern();
        }else if(response.another == "None"){
            team.push(manager);
            
            
            fs.writeFile("./output/team.html", render(team),function(err){
                if(err) throw err;
                console.log("Writing team file...")
            });
            return;
        }
    })
}



runManager();



