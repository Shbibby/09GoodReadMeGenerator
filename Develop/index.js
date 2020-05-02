const https = require('https');
// var GitHubApi = require("github");
const prompt = require('prompt');
const prompt = require('axios');



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
function GitApiCall() {
  this.userNameUrl = undefined;
  this.profileData = undefined;

  this.getNameMakeUrl = () => {
    // prompt user
    const userResponse = String("");
    const url = `https://api.github.com/users/${userResponse}`
    return url;
  }

  // await this.callApi()
  this.callApi = (callApiUrl) => {
    if(userNameUrl != undefined || userNameUrl != null) {
      return axios 
        .get(callApiUrl)
        .then((response) => {
          console.log("Data: ", response)
        })
        .catch((error) => {
          console.log("Error: ", error)
        });
    }

  
  }
// Github API Caller



// Prompts user to answer questions
function GetUserAnswers() {  
  this.title = "",
  this.description = "",
  // this.tableOfContents = "",
  // this.installation = "",
  // this.usage = "",
  // this.license = "",
  // this.contributing = "",
  // this.tests = "",
  // this.questions = ""
  

  this.askQuestions = () => {
    prompt.start();

    prompt.get([])

  }


}
// Prompts user to answer questions

// Makes Read me pdf

// Makes Read me pdf



const myAnswer = new GetUserAnswers();
myAnswer.askQuestions();
console.log("hi");






this.title = await prompt("What should your ReadMe title be?");
      this.description = await prompt("What should your ReadMe description be?");
      // this.tableOfContents = await prompts("What should your ReadMe {---} be?");
      // this.installation = await prompts("What should your ReadMe {---} be?");
      // this.usage = await prompts("What should your ReadMe {---} be?");
      // this.license = await prompts("What should your ReadMe {---} be?");
      // this.contributing = await prompts("What should your ReadMe {---} be?");
      // this.tests = await prompts("What should your ReadMe {---} be?");
      // this.questions = await prompts("What should your ReadMe {---} be?");