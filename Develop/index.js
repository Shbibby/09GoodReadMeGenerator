const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');

// Github API Caller
class ApiCall {
  constructor() {
    this.userNameUrl = undefined;
    this.profileData = undefined;
  }


  getNameMakeUrl(gitName) {
    // prompt user
    const userResponse = gitName;
    const url = `https://api.github.com/users/${userResponse}`
    return url;
  }

  // await this.callApi()
  callApi(callApiUrl) {
    axios 
      .get(callApiUrl, {
        headers: {
          Authorization: "token b3e149b96653aa9873e88a0a9d71ca384fd4f33f"
        }
      })
      .then((response) => {
        // console.log("Data: ", response)
      })
      .catch((error) => {
        // console.log("Error: ", error)
      });
  }
}
// Github API Caller


// ReadMe Template
const readMeTemplate = {
  badge: "",
  title: "My Awesome Title",
  description: "An app that needs no introduction",
  tableOfContents: "",
  installation: "Use the https GitHub download",
  usage: " \
  foobar.pluralize('word') # returns 'words' \
  foobar.pluralize('goose') # returns 'geese' \
  foobar.singularize('phenomena') # returns 'phenomenon'",
  license: "[MIT](https://choosealicense.com/licenses/mit/)",
  contributing: "Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.",
  tests: "node test tester.test.js",
  questions: [
    {Q:"Is this a question", A:"Yes"},
    {Q:"Is this a also question", A:"No"}],
  gitHubProfilePicture: "https://avatars2.githubusercontent.com/u/60363855?v=4",
  gitHubUserEmail: "fakeemail@email.com"
}
// ReadMe Template

class GenerateReadMeFile {
  constructor(readMeData) {
    this.readMeData = readMeData;
  }
  
  getFormattedReadMe() {
    return `
    # ${this.readMeData.title}

    ${this.readMeData.description}
    __________________________________________
    # Table of Contents :
    
    1. [Installation](#Installation)
    2. [Usage](#Usage)
    3. [License](#License)
    4. [Contributing](#Contributing)
    5. [Tests](#Tests) 
    __________________________________________

    ## Installation <a name="Installation"></a>

    ${this.readMeData.installation}

    ## Usage 

    ${this.readMeData.usage}

    ## License

    ${this.readMeData.license}

    ## Contributing

    ${this.readMeData.contributing}

    ## Tests

    ${this.readMeData.tests}
    __________________________________________
    
    Author email : ${this.readMeData.gitHubUserEmail}

    ![Picture](${this.readMeData.gitHubProfilePicture})
    `;
  }
}


// Prompts user to answer questions
class GetUserAnswers {  
  constructor() {
    this.userName = "";
    this.title = "";
    this.description = "";
  }



  async askQuestions() {
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
        }
      ])
      .then(answers => {
        this.userName = answers.userGitName;
        this.title = answers.readMeTitle;
        this.description= answers.readMeDescription;
      })
      .catch(error => {
        if(error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else when wrong
        }
      });
    // inquirer end
  }
}
// Prompts user to answer questions

async function makeMyFile() {
  const getAnswer = new GetUserAnswers();
  await getAnswer.askQuestions();
  readMeTemplate.title = getAnswer.title
  readMeTemplate.description = getAnswer.description

  const apithing = new ApiCall();
  await apithing.callApi("https://api.github.com/users/Shbibby");

  const makeReadMe = new GenerateReadMeFile(readMeTemplate);
  var x = makeReadMe.getFormattedReadMe();
  fs.writeFile("./README.md", x, function(err) {if (err) throw err;});
} 

makeMyFile();
