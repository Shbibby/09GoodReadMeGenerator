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

    return url;
  }

  getRepoMakeUrl(gitName, repo) {
    // input user prompt username for calling git api later
    const url = `https://api.github.com/users/${gitName}/${repo}`;

    return url;
  }
 
  async callApi(callApiUrl) {
    // calls git api with user prompt username
    return axios 
      .get(callApiUrl, {
        headers: {
          Authorization: "b3e149b96653aa9873e88a0a9d71ca384fd4f33f"
        }
      })
  }

}
// Github API Caller

//makes template and inputs user text to readMe
class GenerateReadMeFile {
  // readMe template
  constructor(getTitle, getDesc, getLicense, getEmail, getPic, getRepo) {
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
        gitHubProfilePicture: getPic,
      repoUrl: getRepo
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

[Author Git Repository] (${this.readMeData.repoUrl})

Author email : ${this.readMeData.gitHubUserEmail}

![Picture](${this.readMeData.gitHubProfilePicture})
`;
}
}
//makes template and inputs user text to readMe


// Prompts user to answer questions
class GetUserAnswers {  
  constructor() {

  }



  async askQuestions() {
    // asks user for required data in readMe
    return inquirer
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
        },
        {
          name: 'userGitEmail',
          message: 'What is your github email?',
        },
        {
          name: 'userGithubRepo',
          message: 'What github repository would you like to use?',
        }
      ])
    // inquirer end
  }
}
// Prompts user to answer questions
 

async function ask() {
  const GetAnswer = new GetUserAnswers();
  const answers = await GetAnswer.askQuestions();


  const GitHubApiCall = new ApiCall();
  const url = GitHubApiCall.getNameMakeUrl(answers.userGitName);
   const apiData = await GitHubApiCall.callApi(url);
  const urlRepo = GitHubApiCall.getRepoMakeUrl(answers.userGitName, answers.userGithubRepo);


  const title = answers.readMeTitle;
  const desc = answers.readMeDescription;
  const lic = answers.readMeLicense;
  const email = answers.userGitEmail;
  const pic = apiData.avatar_url;
  const repo = urlRepo;
  
  const makeReadMe = new GenerateReadMeFile(title,desc,lic,email,pic,repo);
  var readMeContent = makeReadMe.getFormattedReadMe();
  fs.writeFile("./README.md", readMeContent, function(err) {if (err) throw err;});
  console.log("File has been written");
} 

ask();
