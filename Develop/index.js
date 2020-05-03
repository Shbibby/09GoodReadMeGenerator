const inquirer = require('inquirer')
const axios = require('axios');



const testArr = {
  "login": "Shbibby",
  "id": 60363855,
  "node_id": "MDQ6VXNlcjYwMzYzODU1",
  "avatar_url": "https://avatars2.githubusercontent.com/u/60363855?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/Shbibby",
  "html_url": "https://github.com/Shbibby",
  "followers_url": "https://api.github.com/users/Shbibby/followers",
  "following_url": "https://api.github.com/users/Shbibby/following{/other_user}",
  "gists_url": "https://api.github.com/users/Shbibby/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/Shbibby/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/Shbibby/subscriptions",
  "organizations_url": "https://api.github.com/users/Shbibby/orgs",
  "repos_url": "https://api.github.com/users/Shbibby/repos",
  "events_url": "https://api.github.com/users/Shbibby/events{/privacy}",
  "received_events_url": "https://api.github.com/users/Shbibby/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Joshua Stillion",
  "company": null,
  "blog": "https://shbibby.github.io/08updatedPortfolio/",
  "location": "Cumming Ga",
  "email": null,
  "hireable": null,
  "bio": "Currently a student in a full stack development bootcamp for Georgia Tech. I love problem solving, design, and just making stuff in general. ",
  "public_repos": 14,
  "public_gists": 0,
  "followers": 9,
  "following": 8,
  "created_at": "2020-01-27T19:33:00Z",
  "updated_at": "2020-05-02T02:29:43Z"
}

// Github API Caller
function ApiCall() {
  this.userNameUrl = undefined;
  this.profileData = undefined;

  this.getNameMakeUrl = function(gitName) {
    // prompt user
    const userResponse = gitName;
    const url = `https://api.github.com/users/${userResponse}`
    return url;
  }

  // await this.callApi()
  this.callApi = function(callApiUrl) {
    axios 
      .get(callApiUrl, {
        headers: {
          Authorization: "token b3e149b96653aa9873e88a0a9d71ca384fd4f33f"
        }
      })
      .then((response) => {
        console.log("Data: ", response)
      })
      .catch((error) => {
        console.log("Error: ", error)
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

function GenerateReadMeFile(readMeData) {
  this.readMeData = readMeData;
  this.formattedReadMe = "";

  this.getFormattedReadMe = function() {
    this.formattedReadMe = `
    # ${this.readMeData.title}

    ${this.readMeData.description}
    __________________________________________
    # Table of Contents :
    
    1. [Installation] (#Installation)
    2. [Usage] (#Usage)
    3. [License] (#License)
    4. [Contributing] (#Contributing)
    5. [Tests] (#Tests) 
    __________________________________________

    ## Installation

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

    console.log(formattedReadMe);
  }
}


// Prompts user to answer questions
function GetUserAnswers() {  
  this.userName = "";
  this.title = "";
  this.description = "";


  this.askQuestions = function() {
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

  this.storeAnswers = function(readMeData) {
    readMeData.title = this.title
  } 
}
// Prompts user to answer questions



async function makeMyFile() {
  // const getAnswer = new GetUserAnswers();
  // getAnswer.askQuestions();
  // readMeTemplate.title = getAnswer.title
  // readMeTemplate.description = getAnswer.description

  // const apithing = new ApiCall();
  // apithing.callApi("https://api.github.com/users/Shbibby");

  const makeReadMe = new GenerateReadMeFile(readMeTemplate);
  makeReadMe.GenerateReadMeFile();

} 

makeMyFile();