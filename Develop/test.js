var GitHubApi = require("github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    pathPrefix: "", // for some GHEs; none for GitHub
    timeout: 5000,
    headers: {
        "user-agent": "Some cool app" // GitHub is happy with a unique user agent
    }
});

github.authenticate({
    type: "basic",
    username: "joshstillion@gmail.com",
    password: "Rickandmortyforeverandever45"
});

/* gets all repos as an array
 */
github.repos.getAll({}, function(err, list) {
    console.log( list );
});


// git profile api [ https://api.github.com/users/${user} ]  \\

// const userGitReadMe = {
//   title: "",
//   description: "",
//   tableOfContents: "",
//   installation: "",
//   usage: "",
//   license: "",
//   contributing: "",
//   tests: "",
//   questions = ""
// }