const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');


// Github API Caller
class ApiCall {
  constructor() {
    this.userNameUrl = "";
    this.profileData = "";

    this.gitApiEmail = "";
    this.gitApiPicture = "";
  }


  getNameMakeUrl(gitName) {
    // input user prompt username for calling git api later
    const url = `https://api.github.com/users/${gitName}`;
    this.userNameUrl = url;

    return url;
  }

 
  async callApi(callApiUrl) {
    // calls git api with user prompt username
    axios 
      .get(callApiUrl, {
        headers: {
          Authorization: "token b3e149b96653aa9873e88a0a9d71ca384fd4f33f"
        }
      })
      .then((response) => {
        this.gitApiEmail = response.email;
        this.gitApiPicture = response.avatar_url;
      })
      .catch((error) => {
        throw error;
      });
  }
}
// Github API Caller

//makes template and inputs user text to readMe
class GenerateReadMeFile {
  // readMe template
  constructor(getTitle, getDesc, getLicense, getEmail, getPic) {
    this.readMeData = {
      badge: "",
      title: getTitle,
      description: getDesc,
      tableOfContents: "",
      installation: "Use the https GitHub download",
      usage: "```sh \nnode index.js \n```",
      license: `[Project License](${getLicense})`,
      contributing: "Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.",
      tests: "```sh \nnode test tester.test.js \n```",
      questions: [
        {Q:"Is this a question", A:"Yes"},
        {Q:"Is this a also question", A:"No"}],
        gitHubUserEmail: getEmail,
        gitHubProfilePicture: getPic
    }
  }
  
getFormattedReadMe() {
  // injects user input data for customized readMe
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

## Installation
______________________________________

${this.readMeData.installation}

## Usage 
______________________________________

${this.readMeData.usage}

## License
______________________________________

${this.readMeData.license}

## Contributing
______________________________________

${this.readMeData.contributing}

## Tests
______________________________________

${this.readMeData.tests}
__________________________________________

Author email : ${this.readMeData.gitHubUserEmail}

![Picture](${this.readMeData.gitHubProfilePicture})
`;
}
}
//makes template and inputs user text to readMe


// Prompts user to answer questions
class GetUserAnswers {  
  constructor() {
    this.userName = "";
    this.title = "";
    this.description = "";
    this.license = "";
  }



  async askQuestions() {
    // asks user for required data in readMe
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
        this.description= answers.readMeDescription;
        this.license = answers.readMeLicense;

        const obj = {
          userName : answers.userGitName,
          title : answers.readMeTitle,
          description : answers.readMeDescription,
          license : answers.readMeLicense
        }
        console.log(obj)
        return obj;

      })
      
    // inquirer end
  }
}
// Prompts user to answer questions
 
let answers = {};
async function ask() {
  const GetAnswer = new GetUserAnswers();
  answers = await GetAnswer.askQuestions();
}  

async function api() {
  console.log("api start");
  const GitHubApiCall = new ApiCall();
  const url = GitHubApiCall.getNameMakeUrl(answers.userName);
  await GitHubApiCall.callApi(url);
  console.log("api end");
}

function make() {
  console.log("make start");
  const title = answers.title;
  const desc = answers.description;
  const lic = answers.license;
  const email = GitHubApiCall.gitApiEmail;
  const pic = GitHubApiCall.gitApiPicture;
  
  const makeReadMe = new GenerateReadMeFile(title,desc,lic,email,pic);
  var readMeContent = makeReadMe.getFormattedReadMe();
  fs.writeFile("./README.md", readMeContent, function(err) {if (err) throw err;});
  console.log("make end");
} 

ask().then(api()).then(make()); // api & make not waiting for ask to finish before running