const https = require('https');

// git profile api [ https://api.github.com/users/${user} ]  \\

const userGitReadMe = {
  this.title: "",
  description: "",
  tableOfContents: "",
  installation: "",
  usage: "",
  license: "",
  contributing: "",
  tests: "",
  questions = ""
}


function HttpGet(url) {
  this.url = url;
  this.gitData = undefined;

  this.callEndPoint = () => {
    https.get(this.url, (resp) => {
      let data = '';
    
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        this.getData = data;
        console.log(JSON.parse(data).explanation);
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  }
  
}


