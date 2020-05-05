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
    // prompt user
    const url = `https://api.github.com/users/${gitName}`;
    this.userNameUrl = url;
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
        this.gitApiEmail = response.email;
        this.gitApiPicture = response.avatar_url;
      })
      .catch((error) => {
        // console.log("Error: ", error)
      });
  }
}
// Github API Caller


// ReadMe Template
// const readMeTemplate = {
//   badge: "",
//   title: "",
//   description: "",
//   tableOfContents: "",
//   installation: "Use the https GitHub download",
//   usage: "```sh \nnode index.js \n```",
//   license: "[GitHub License](https://choosealicense.com/licenses/mit/)",
//   contributing: "Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.",
//   tests: "```sh \nnode test tester.test.js \n```",
//   questions: [
//     {Q:"Is this a question", A:"Yes"},
//     {Q:"Is this a also question", A:"No"}],
//   gitHubProfilePicture: "https://avatars2.githubusercontent.com/u/60363855?v=4",
//   gitHubUserEmail: "fakeemail@email.com"
// }
// ReadMe Template

class GenerateReadMeFile {
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


// Prompts user to answer questions
class GetUserAnswers {  
  constructor() {
    this.userName = "";
    this.title = "";
    this.description = "";
    this.license = "";
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
  const GetAnswer = new GetUserAnswers();
  await GetAnswer.askQuestions();
  // readMeTemplate.title = GetAnswer.title
  // readMeTemplate.description = GetAnswer.description

  const GitHubApiCall = new ApiCall();
  await GitHubApiCall.getNameMakeUrl(GetAnswer.userName);
  await GitHubApiCall.callApi(GitHubApiCall.userNameUrl);


  const title = GetAnswer.title;
  const desc = GetAnswer.description;
  const lic = GetAnswer.license;
  const email = GitHubApiCall.gitApiEmail;
  const pic = GitHubApiCall.gitApiPicture;
  
  const makeReadMe = new GenerateReadMeFile(title,desc,lic,email,pic);
  var readMeContent = makeReadMe.getFormattedReadMe();
  fs.writeFile("./README.md", readMeContent, function(err) {if (err) throw err;});
} 

makeMyFile();
