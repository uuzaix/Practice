const fetch = require("node-fetch");

async function getGitHubUser(name) {
  const url = `https://api.github.com/users/${name}`;
  const response = await fetch(url);
  return await response.json();
}

getGitHubUser("uuzaix")
  .then(user => {
    console.log(user.name)
    console.log(user.location)
  });