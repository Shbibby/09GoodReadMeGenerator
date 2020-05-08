const inquirer = require('inquirer');

function askQuestions() {
  inquirer
    .prompt([
      {
        name: 'userGitName',
        message: 'What is your GitHub username?',
      },
      {
        name: 'readMeTitle',
        message: 'What would you like your ReadMe title to be?',
      },
      {
        name: 'readMeDescription',
        message: 'What would you like your ReadMe description to be?',
      },
      {
        name: 'readMeLicense',
        message: 'What is your repository license?',
      }
    ])
    .then(answers => {
      this.userName = answers.userGitName;
      this.title = answers.readMeTitle;
      console.log("a" + answers.readMeTitle)
      console.log("b" + this.title)

      this.description= answers.readMeDescription;
      this.license = answers.readMeLicense;

      return this.arr;
    })
  // inquirer end
}

askQuestions();