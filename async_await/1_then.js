const fetch = require("node-fetch");

function getGitHubUser(name) {
  const url = `https://api.github.com/users/${name}`;
  fetch(url)
    .then(response => response.json())
    .then(user => {
      console.log(user.name);
      console.log(user.location);
    })
}

getGitHubUser("uuzaix");