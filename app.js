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
            message: "Manager ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Manager Email:"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Manager Office Number:"
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
            message: "Engineer ID:"
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
            message: "Intern ID:"
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
            console.log("Generating team...");
            
            fs.writeFile("./renderHTML/team.html", render(team),function(err){
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
            console.log("Generating team...");
            
            fs.writeFile("./renderHTML/team.html", render(team),function(err){
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
            console.log("Generating team...");
            
            fs.writeFile("./renderHTML/team.html", render(team),function(err){
                if(err) throw err;
                console.log("Writing team file...")
            });
            return;
        }
    })
}



runManager();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
